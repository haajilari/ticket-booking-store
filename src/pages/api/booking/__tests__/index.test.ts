// src/pages/api/booking/__tests__/index.test.ts
import type { NextApiRequest, NextApiResponse } from "next";
import bookingHandler from "../index";
import { TicketType } from "@/types/ticket";

const mockRequest = (
  method: string,
  query?: any,
  body?: any
): Partial<NextApiRequest> => ({
  method,
  query: query || {},
  body: body || {},
  headers: {},
});

// A simple mock for res
const mockResponse = (): {
  status: jest.Mock;
  json: jest.Mock;
  setHeader: jest.Mock;
  end: jest.Mock;
  send: jest.Mock; // Added send for better compatibility
} => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res); // For chaining (res.status().json())
  res.json = jest.fn().mockReturnValue(res);
  res.setHeader = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("/api/booking API Route", () => {
  const validBookingData = {
    ticketId: "f123",
    ticketType: TicketType.Flight,
    companyName: "Test Air",
    origin: "Test Origin",
    destination: "Test Destination",
    quantity: 1,
    userName: "Test User",
    userEmail: "test@example.com",
    totalPrice: 100000,
  };

  it("should return 201 for a valid POST request", async () => {
    // Mock Math.random to prevent simulated errors
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.1; // Value greater than 0.05 to avoid error
    global.Math = mockMath;

    const req = mockRequest("POST", {}, validBookingData) as NextApiRequest;
    const res = mockResponse() as unknown as NextApiResponse;

    await bookingHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Your booking has been successfully registered.",
        bookingId: expect.any(String),
        bookingDetails: validBookingData,
      })
    );

    // Restore Math.random to its original state
    global.Math = Object.getPrototypeOf(mockMath);
  });

  it("should return 400 for invalid data (e.g., missing userName)", async () => {
    const invalidData = { ...validBookingData, userName: "" }; // Empty username
    const req = mockRequest("POST", {}, invalidData) as NextApiRequest;
    const res = mockResponse() as unknown as NextApiResponse;

    await bookingHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Invalid submitted data.",
        errors: expect.arrayContaining([
          expect.objectContaining({
            field: "userName",
            message: "User name is required.",
          }),
        ]),
      })
    );
  });

  it("should return 405 if method is not POST", async () => {
    const req = mockRequest("GET") as NextApiRequest; // Invalid method
    const res = mockResponse() as unknown as NextApiResponse;

    await bookingHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    // ... (Additional assertions can be added here)
  });

  // You can add a test for the simulated 5% error as well
  it("should simulate a server error occasionally", async () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.01; // Value less than 0.05 to trigger simulated error
    global.Math = mockMath;

    const req = mockRequest("POST", {}, validBookingData) as NextApiRequest;
    const res = mockResponse() as unknown as NextApiResponse;

    await bookingHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message:
          "Internal server error while processing booking. Please try again later.",
      })
    );

    global.Math = Object.getPrototypeOf(mockMath);
  });
});
