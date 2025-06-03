// src/store/bookingStore.ts
import { create } from "zustand";
import { Ticket } from "@/types/ticket";

// Define the data type for user information in the form
interface UserInfo {
  name: string;
  email: string;
}

// Define the state structure of our store
interface BookingState {
  ticketForBooking: Ticket | null;
  quantity: number;
  userInfo: UserInfo | null;
  bookingStatus: "idle" | "loading" | "succeeded" | "failed";
  bookingError: string | null;

  // Define actions to modify the state
  setTicketForBooking: (ticket: Ticket, quantity: number) => void;
  updateUserInfo: (info: UserInfo) => void;
  submitBooking: () => Promise<void>;
  resetBookingState: () => void;
}

/**
 * @description Zustand store for managing the ticket booking process state.
 */
export const useBookingStore = create<BookingState>((set, get) => ({
  // Initial state values
  ticketForBooking: null,
  quantity: 1,
  userInfo: null,
  bookingStatus: "idle",
  bookingError: null,
  /**
   * @description Sets the ticket and quantity to start the booking process.
   * @param {Ticket} ticket - Ticket object.
   * @param {number} quantity - Number of tickets.
   */
  setTicketForBooking: (ticket, quantity) =>
    set({
      ticketForBooking: ticket,
      quantity: quantity,
      bookingStatus: "idle", // With a new ticket selection, the status resets to initial
      bookingError: null,
    }),

  /**
   * @description Updates user information.
   * @param {UserInfo} info - User information (name and email).
   */
  updateUserInfo: (info) => set({ userInfo: info }),

  /**
   * @description Sends a booking request to the server API.
   */
  submitBooking: async () => {
    const { ticketForBooking, quantity, userInfo } = get();

    if (!ticketForBooking || !userInfo || quantity < 1) {
      set({
        bookingStatus: "failed",
        bookingError: "Booking information is incomplete for server submission.",
      });
      return;
    }

    set({ bookingStatus: "loading", bookingError: null });

    const bookingPayload = {
      ticketId: ticketForBooking.id,
      ticketType: ticketForBooking.type,
      companyName: ticketForBooking.companyName,
      origin: ticketForBooking.origin,
      destination: ticketForBooking.destination,
      quantity,
      userName: userInfo.name,
      userEmail: userInfo.email,
      totalPrice: ticketForBooking.price * quantity,
    };

    try {
      const response = await fetch("/api/booking", {
        // Our API Route address
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      const responseData = await response.json(); // Always try to read the response

      if (!response.ok) {
        // If the server response indicates an error (e.g., 400, 500)
        // responseData may include an error message from the server
        throw new Error(
          responseData.message || `Server responded with ${response.status}`
        );
      }

      // Successful response from the server (e.g., 201)
      // responseData will include bookingId and other details.
      console.log("Store: Booking successful! API Response:", responseData);
      set({ bookingStatus: "succeeded", bookingError: null });
      // Here, responseData.bookingId could be stored in the store if needed
    } catch (error) {
      console.error("Store: Booking submission failed:", error);
      const message =
        error instanceof Error ? error.message : "Unknown error in server communication";
      set({
        bookingStatus: "failed",
        bookingError: `Error in booking registration: ${message}`,
      });
    }
  },

  /**
   * @description Resets the store state to its initial values.
   * Typically called after a successful or failed booking process and displaying a message to the user.
   */
  resetBookingState: () =>
    set({
      ticketForBooking: null,
      quantity: 1,
      userInfo: null,
      bookingStatus: "idle",
      bookingError: null,
    }),
}));

// We can also define commonly used selectors here
// export const selectBookingStatus = (state: BookingState) => state.bookingStatus;
