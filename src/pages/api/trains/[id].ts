// src/pages/api/trains/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { TicketType, TrainTicket } from "@/types/ticket";

// Mock data for trains (should be consistent with data in index.ts in the same directory or sourced from a common module)
// For simplicity, we redefine it here. In practice, this data should come from a shared module or database.
const mockTrains: TrainTicket[] = [
  {
    id: "t789",
    type: TicketType.Train,
    origin: "Tehran",
    destination: "Yazd",
    departureTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 4 * 24 * 60 * 60 * 1000 + 7 * 60 * 60 * 1000
    ).toISOString(),
    price: 850000,
    currency: "Toman",
    companyName: "Raja",
    trainNumber: "T101",
    seatClass: "4-Bed Special",
  },
  {
    id: "t1011",
    type: TicketType.Train,
    origin: "Mashhad",
    destination: "Isfahan",
    departureTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 6 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000
    ).toISOString(),
    price: 1100000,
    currency: "Toman",
    companyName: "Fadak",
    trainNumber: "F205",
    seatClass: "Business",
  },
  // Additional mock train data
  {
    id: "t1213",
    type: TicketType.Train,
    origin: "Tabriz",
    destination: "Tehran",
    departureTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000
    ).toISOString(),
    price: 900000,
    currency: "Toman",
    companyName: "Raja",
    trainNumber: "T302",
    seatClass: "Economy",
  },
  {
    id: "t1415",
    type: TicketType.Train,
    origin: "Shiraz",
    destination: "Mashhad",
    departureTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000
    ).toISOString(),
    price: 1300000,
    currency: "Toman",
    companyName: "Fadak",
    trainNumber: "F408",
    seatClass: "Business",
  },
  {
    id: "t1617",
    type: TicketType.Train,
    origin: "Ahvaz",
    destination: "Tehran",
    departureTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000
    ).toISOString(),
    price: 950000,
    currency: "Toman",
    companyName: "Raja",
    trainNumber: "T509",
    seatClass: "4-Bed Standard",
  },
  {
    id: "t1819",
    type: TicketType.Train,
    origin: "Kerman",
    destination: "Isfahan",
    departureTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000
    ).toISOString(),
    price: 700000,
    currency: "Toman",
    companyName: "Fadak",
    trainNumber: "F611",
    seatClass: "Economy",
  },
  {
    id: "t2021",
    type: TicketType.Train,
    origin: "Bandar Abbas",
    destination: "Tehran",
    departureTime: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 8 * 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000
    ).toISOString(),
    price: 1400000,
    currency: "Toman",
    companyName: "Raja",
    trainNumber: "T712",
    seatClass: "6-Bed Standard",
  },
  {
    id: "t2223",
    type: TicketType.Train,
    origin: "Qom",
    destination: "Mashhad",
    departureTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 4 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000
    ).toISOString(),
    price: 1000000,
    currency: "Toman",
    companyName: "Fadak",
    trainNumber: "F813",
    seatClass: "Business",
  },
  {
    id: "t2425",
    type: TicketType.Train,
    origin: "Rasht",
    destination: "Tehran",
    departureTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000
    ).toISOString(),
    price: 600000,
    currency: "Toman",
    companyName: "Raja",
    trainNumber: "T914",
    seatClass: "Economy",
  },
  {
    id: "t2627",
    type: TicketType.Train,
    origin: "Sari",
    destination: "Yazd",
    departureTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 6 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000
    ).toISOString(),
    price: 1050000,
    currency: "Toman",
    companyName: "Fadak",
    trainNumber: "F015",
    seatClass: "4-Bed Special",
  },
  {
    id: "t2829",
    type: TicketType.Train,
    origin: "Zanjan",
    destination: "Shiraz",
    departureTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000 + 13 * 60 * 60 * 1000
    ).toISOString(),
    price: 1150000,
    currency: "Toman",
    companyName: "Raja",
    trainNumber: "T116",
    seatClass: "6-Bed Standard",
  },
  {
    id: "t3031",
    type: TicketType.Train,
    origin: "Kish",
    destination: "Mashhad",
    departureTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000
    ).toISOString(),
    price: 1500000,
    currency: "Toman",
    companyName: "Fadak",
    trainNumber: "F217",
    seatClass: "Business",
  },
];

/**
 * @description API route for retrieving information about a specific train based on ID.
 * Only the GET method is supported.
 * @param {NextApiRequest} req The request object, including `req.query.id`.
 * @param {NextApiResponse<TrainTicket | { message: string }>} res The response object.
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TrainTicket | { message: string }>
) {
  const { id } = req.query; // id is extracted from the URL path (e.g., /api/trains/f123)

  if (req.method === "GET") {
    const train = mockTrains.find((f) => f.id === id);

    if (train) {
      res.status(200).json(train);
    } else {
      res.status(404).json({ message: `Train with ID ${id} not found.` });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
