import type { NextApiRequest, NextApiResponse } from "next";
import { TicketType } from "@/types/ticket";

// Define the expected data type in the request body
interface BookingRequestBody {
  ticketId: string;
  ticketType: TicketType;
  companyName: string;
  origin: string;
  destination: string;
  quantity: number;
  userName: string;
  userEmail: string;
  totalPrice: number;
}

// Define the data type for a successful response
interface BookingSuccessResponse {
  message: string;
  bookingId: string; // A simulated booking ID
  bookingDetails: BookingRequestBody;
}

// Define the data type for an error response
interface ErrorResponse {
  message: string;
  errors?: { field: string; message: string }[];
}

/**
 * @description API route for processing ticket booking requests.
 * Only the POST method is supported.
 * @param {NextApiRequest} req - Request object.
 * @param {NextApiResponse<BookingSuccessResponse | ErrorResponse>} res - Response object.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BookingSuccessResponse | ErrorResponse>
) {
  if (req.method === "POST") {
    try {
      const bookingData = req.body as BookingRequestBody;

      // --- 1. Server-side input data validation ---
      const validationErrors: { field: string; message: string }[] = [];
      if (!bookingData.ticketId)
        validationErrors.push({ field: "ticketId", message: "Ticket ID is required." });
      if (
        !bookingData.quantity ||
        bookingData.quantity < 1 ||
        bookingData.quantity > 10
      ) {
        validationErrors.push({
          field: "quantity",
          message: "Ticket quantity must be between 1 and 10.",
        });
      }
      if (!bookingData.userName?.trim())
        validationErrors.push({ field: "userName", message: "User name is required." });
      if (!bookingData.userEmail?.trim() || !/\S+@\S+\.\S+/.test(bookingData.userEmail)) {
        validationErrors.push({ field: "userEmail", message: "User email is invalid." });
      }
      // Additional validations can be added (e.g., checking ticket availability with ticketId in the database)

      if (validationErrors.length > 0) {
        return res
          .status(400)
          .json({ message: "Invalid submitted data.", errors: validationErrors });
      }

      // --- 2. Simulate booking processing ---
      // In a real application:
      // - Check ticket availability
      // - Connect to a payment gateway
      // - Save the booking to the database
      // - Send a confirmation email or SMS
      console.log("API: Received booking data:", bookingData);

      // Simulate a time-consuming server operation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate an error in 5% of cases for testing
      if (Math.random() < 0.05) {
        console.error("API: Simulated booking processing error.");
        return res.status(500).json({
          message:
            "Internal server error while processing booking. Please try again later.",
        });
      }

      const bookingId = `BKNG-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase()}`;
      console.log(`API: Booking successful. Booking ID: ${bookingId}`);

      // --- 3. Send successful response ---
      return res.status(201).json({
        // 201 Created
        message: "Your booking has been successfully registered.",
        bookingId: bookingId,
        bookingDetails: bookingData,
      });
    } catch (error) {
      console.error("API: Error processing booking request:", error);
      return res.status(500).json({ message: "An unexpected server error occurred." });
    }
  } else {
    // If another method is used
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
