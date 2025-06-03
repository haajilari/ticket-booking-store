// src/components/booking/BookingForm.tsx
import React, { useState, FormEvent, JSX } from "react";
import styles from "./BookingForm.module.scss";

// Define form data interface
interface BookingFormData {
  ticketId: string;
  name: string;
  email: string;
  quantity: number;
}

// Define component properties (currently no specific props needed, but can be added for future use)
interface BookingFormProps {
  ticketId: string; // ID of the ticket being booked
  ticketName: string; // Name or identifier of the ticket to display in the form
  onSubmitSuccess: (data: BookingFormData) => void; // Callback function triggered after successful form submission
}

/**
 * @description Component for the booking form to reserve a ticket.
 * Includes fields for name, email, and ticket quantity.
 * Uses local state to manage form data.
 * @param {BookingFormProps} props - Component properties.
 * @returns {JSX.Element} The booking form.
 */
const BookingForm = ({
  ticketId,
  ticketName,
  onSubmitSuccess,
}: BookingFormProps): JSX.Element => {
  const [formData, setFormData] = useState<BookingFormData>({
    ticketId: "",
    name: "",
    email: "",
    quantity: 1,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * @description Handles changes in form input fields.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - Change event.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      // If the type is numeric, convert the value to a number
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));
    // Clear error when the user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  /**
   * @description Validates the form.
   * @returns {boolean} Whether the form is valid or not.
   */
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (formData.quantity < 1) {
      newErrors.quantity = "Ticket quantity must be at least 1.";
    } else if (formData.quantity > 10) {
      // Sample restriction
      newErrors.quantity = "Maximum ticket quantity allowed is 10.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if there are no errors
  };

  /**
   * @description Handles form submission.
   * @param {FormEvent<HTMLFormElement>} e - Form submission event.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission and page refresh
    if (!validateForm()) {
      return; // If the form is invalid, do not proceed
    }

    setIsSubmitting(true);
    console.log("Form data for submission:", { ...formData, ticketId });

    // Simulate submission to a server
    // In the next module, this section will be converted to a real API call.
    try {
      // Imagine we have a function here to submit data to an API
      // await submitBookingApi({ ...formData, ticketId });
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
      let ticketId: string = "unique_id"; //Suppose to be Dynamic ID
      // After successful submission
      onSubmitSuccess({ ...formData, ticketId }); // Send form data to parent
      // Reset the form (optional)
      setFormData({ name: "", email: "", quantity: 1, ticketId });
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: "Error in booking process. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.bookingFormContainer}>
      <h3>Book Ticket for: {ticketName}</h3>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? styles.errorInput : ""}
            aria-describedby="nameError"
            required
          />
          {errors.name && (
            <span id="nameError" className={styles.errorMessage}>
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? styles.errorInput : ""}
            aria-describedby="emailError"
            required
          />
          {errors.email && (
            <span id="emailError" className={styles.errorMessage}>
              {errors.email}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="quantity">Ticket Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            max="10" // Sample restriction
            className={errors.quantity ? styles.errorInput : ""}
            aria-describedby="quantityError"
            required
          />
          {errors.quantity && (
            <span id="quantityError" className={styles.errorMessage}>
              {errors.quantity}
            </span>
          )}
        </div>

        {errors.form && (
          <p className={`${styles.errorMessage} ${styles.formSubmissionError}`}>
            {errors.form}
          </p>
        )}

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
