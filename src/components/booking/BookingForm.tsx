// src/components/booking/BookingForm.tsx
import React, { useState, FormEvent, useEffect, JSX } from "react";
import styles from "./BookingForm.module.scss";
import { useBookingStore } from "@/store/bookingStore";
import { Ticket } from "@/types/ticket";

interface LocalFormData {
  name: string;
  email: string;
  // quantity is no longer in the local form state, it is read from the store
}

interface BookingFormProps {
  ticket: Ticket;
  initialQuantity?: number;
  // onSubmitSuccess is no longer needed, success state is read from the store
}

const BookingForm = ({ ticket, initialQuantity = 1 }: BookingFormProps): JSX.Element => {
  // Store-related state
  const {
    setTicketForBooking,
    updateUserInfo,
    submitBooking,
    bookingStatus,
    bookingError,
  } = useBookingStore();

  // Local state for form fields and local errors
  const [localFormData, setLocalFormData] = useState<LocalFormData>({
    name: useBookingStore.getState().userInfo?.name || "", // Initial value from store if it exists
    email: useBookingStore.getState().userInfo?.email || "",
  });
  const [localQuantity, setLocalQuantity] = useState<number>(
    useBookingStore.getState().ticketForBooking?.id === ticket.id
      ? useBookingStore.getState().quantity
      : initialQuantity
  );
  const [localErrors, setLocalErrors] = useState<{ [key: string]: string }>({});

  // When the component mounts or the ticket changes, set the ticket in the store
  useEffect(() => {
    if (useBookingStore.getState().ticketForBooking?.id !== ticket.id) {
      setTicketForBooking(ticket, localQuantity);
    }
    // If the user leaves and returns, we don’t reset the form state unless explicitly requested
    // return () => {
    //   if (bookingStatus !== 'succeeded') { // If booking was not successful, we might want to retain the state
    //      resetBookingState(); // Or part of it
    //   }
    // };
  }, [ticket, localQuantity, setTicketForBooking, bookingStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({ ...prevData, [name]: value }));
    if (localErrors[name]) {
      setLocalErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10) || 1;
    setLocalQuantity(newQuantity);
    if (useBookingStore.getState().ticketForBooking?.id === ticket.id) {
      useBookingStore.setState({ quantity: newQuantity });
    }
    if (localErrors.quantity) {
      setLocalErrors((prevErrors) => ({ ...prevErrors, quantity: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!localFormData.name.trim()) newErrors.name = "Name is required.";
    if (!localFormData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(localFormData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (localQuantity < 1) newErrors.quantity = "Ticket quantity must be at least 1.";
    else if (localQuantity > 10)
      newErrors.quantity = "Maximum ticket quantity allowed is 10.";

    setLocalErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Update user information in the store
    updateUserInfo({ name: localFormData.name, email: localFormData.email });
    // Ensure the ticket and quantity are correctly set in the store before submit
    // (the user might have changed the quantity)
    setTicketForBooking(ticket, localQuantity);

    // Call the submit action from the store
    await submitBooking();
  };

  // If booking was successful, we could hide the form or display a different success message
  // This is better managed in the parent component (details page).
  // However, we can display the general error from the store here.

  return (
    <div className={styles.bookingFormContainer}>
      <h3>
        Book Ticket for: {ticket.companyName} ({ticket.origin} to {ticket.destination})
      </h3>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        {/* Name */}
        <div className={styles.formGroup}>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={localFormData.name}
            onChange={handleChange}
            className={localErrors.name ? styles.errorInput : ""}
          />
          {localErrors.name && (
            <span className={styles.errorMessage}>{localErrors.name}</span>
          )}
        </div>
        {/* Email */}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={localFormData.email}
            onChange={handleChange}
            className={localErrors.email ? styles.errorInput : ""}
          />
          {localErrors.email && (
            <span className={styles.errorMessage}>{localErrors.email}</span>
          )}
        </div>
        {/* Quantity */}
        <div className={styles.formGroup}>
          <label htmlFor="quantity">Ticket Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={localQuantity}
            onChange={handleQuantityChange}
            min="1"
            max="10"
            className={localErrors.quantity ? styles.errorInput : ""}
          />
          {localErrors.quantity && (
            <span className={styles.errorMessage}>{localErrors.quantity}</span>
          )}
        </div>

        {/* Display general error from store if it exists */}
        {bookingStatus === "failed" && bookingError && (
          <p className={`${styles.errorMessage} ${styles.formSubmissionError}`}>
            {bookingError}
          </p>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={bookingStatus === "loading"}
        >
          {bookingStatus === "loading" ? "Submitting..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
