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
      bookingStatus: "idle",
      bookingError: null,
    }),

  /**
   * @description Updates user information.
   * @param {UserInfo} info - User information (name and email).
   */
  updateUserInfo: (info) => set({ userInfo: info }),

  /**
   * @description Simulates sending a booking request to the server.
   * In the next module, this function will perform a real API call.
   */
  submitBooking: async () => {
    const { ticketForBooking, quantity, userInfo } = get();

    if (!ticketForBooking || !userInfo || quantity < 1) {
      set({
        bookingStatus: "failed",
        bookingError: "Booking information is incomplete.",
      });
      return;
    }

    set({ bookingStatus: "loading", bookingError: null });

    try {
      // Simulate API call
      console.log("Store: Sending booking request to API with data:", {
        ticketId: ticketForBooking.id,
        ticketType: ticketForBooking.type,
        company: ticketForBooking.companyName,
        origin: ticketForBooking.origin,
        destination: ticketForBooking.destination,
        quantity,
        userName: userInfo.name,
        userEmail: userInfo.email,
        totalPrice: ticketForBooking.price * quantity,
      });

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

      // Assume the API responds successfully
      // const response = await bookingApi.submit({ ticketId: ticketForBooking.id, quantity, userInfo });
      set({ bookingStatus: "succeeded", bookingError: null });
      console.log("Store: Booking successful!");
    } catch (error) {
      console.error("Store: Booking failed:", error);
      const message = error instanceof Error ? error.message : "Unknown server error";
      set({
        bookingStatus: "failed",
        bookingError: `Error in booking process: ${message}`,
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
