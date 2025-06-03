// src/pages/api/flights/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { FlightTicket, TicketType } from "@/types/ticket";

// Mock data for flights (should be consistent with data in index.ts in the same directory or sourced from a common module)
// For simplicity, we redefine it here. In practice, this data should come from a shared module or database.
const mockFlights: FlightTicket[] = [
  {
    id: "f123",
    type: TicketType.Flight,
    origin: "Tehran (THR)",
    destination: "Mashhad (MHD)",
    departureTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
    ).toISOString(),
    price: 1500000,
    currency: "Toman",
    companyName: "Iran Air",
    flightNumber: "IR456",
    gate: "A5",
  },
  {
    id: "f456",
    type: TicketType.Flight,
    origin: "Shiraz (SYZ)",
    destination: "Isfahan (IFN)",
    departureTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000
    ).toISOString(),
    price: 950000,
    currency: "Toman",
    companyName: "Mahan Air",
    flightNumber: "W5102",
  },
  {
    id: "f789",
    type: TicketType.Flight,
    origin: "Kish (KIH)",
    destination: "Tehran (IKA)",
    departureTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000 + 1.2 * 60 * 60 * 1000
    ).toISOString(),
    price: 1200000,
    currency: "Toman",
    companyName: "Kish Air",
    flightNumber: "Y9710",
    gate: "B2",
  },
  // Additional mock flight data (synchronized with /api/flights/index.ts)
  {
    id: "f101",
    type: TicketType.Flight,
    origin: "Tabriz (TBZ)",
    destination: "Bandar Abbas (BND)",
    departureTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 4 * 24 * 60 * 60 * 1000 + 2.5 * 60 * 60 * 1000
    ).toISOString(),
    price: 1800000,
    currency: "Toman",
    companyName: "Aseman Airlines",
    flightNumber: "EP632",
    gate: "C1",
  },
  {
    id: "f202",
    type: TicketType.Flight,
    origin: "Ahvaz (AWZ)",
    destination: "Tehran (THR)",
    departureTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 6 * 24 * 60 * 60 * 1000 + 1.8 * 60 * 60 * 1000
    ).toISOString(),
    price: 1100000,
    currency: "Toman",
    companyName: "Qeshm Air",
    flightNumber: "QB1201",
    gate: "D3",
  },
  {
    id: "f303",
    type: TicketType.Flight,
    origin: "Isfahan (IFN)",
    destination: "Kish (KIH)",
    departureTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000 + 1.7 * 60 * 60 * 1000
    ).toISOString(),
    price: 1300000,
    currency: "Toman",
    companyName: "Kish Air",
    flightNumber: "Y9720",
    gate: "A3",
  },
  {
    id: "f404",
    type: TicketType.Flight,
    origin: "Mashhad (MHD)",
    destination: "Shiraz (SYZ)",
    departureTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000 + 2.2 * 60 * 60 * 1000
    ).toISOString(),
    price: 1400000,
    currency: "Toman",
    companyName: "Mahan Air",
    flightNumber: "W5105",
    gate: "B4",
  },
  {
    id: "f505",
    type: TicketType.Flight,
    origin: "Bandar Abbas (BND)",
    destination: "Tehran (IKA)",
    departureTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
    ).toISOString(),
    price: 1600000,
    currency: "Toman",
    companyName: "Iran Air",
    flightNumber: "IR458",
    gate: "C2",
  },
  {
    id: "f606",
    type: TicketType.Flight,
    origin: "Qom (QOM)",
    destination: "Mashhad (MHD)",
    departureTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 4 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000
    ).toISOString(),
    price: 1000000,
    currency: "Toman",
    companyName: "Aseman Airlines",
    flightNumber: "EP634",
    gate: "D1",
  },
  {
    id: "f707",
    type: TicketType.Flight,
    origin: "Rasht (RAS)",
    destination: "Tehran (THR)",
    departureTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000 + 0.8 * 60 * 60 * 1000
    ).toISOString(),
    price: 900000,
    currency: "Toman",
    companyName: "Qeshm Air",
    flightNumber: "QB1203",
    gate: "A2",
  },
  {
    id: "f808",
    type: TicketType.Flight,
    origin: "Sari (SRY)",
    destination: "Kish (KIH)",
    departureTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 6 * 24 * 60 * 60 * 1000 + 2.3 * 60 * 60 * 1000
    ).toISOString(),
    price: 1450000,
    currency: "Toman",
    companyName: "Kish Air",
    flightNumber: "Y9730",
    gate: "B3",
  },
  {
    id: "f909",
    type: TicketType.Flight,
    origin: "Zanjan (ZAN)",
    destination: "Shiraz (SYZ)",
    departureTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
    ).toISOString(),
    price: 1250000,
    currency: "Toman",
    companyName: "Mahan Air",
    flightNumber: "W5107",
    gate: "C4",
  },
  {
    id: "f1010",
    type: TicketType.Flight,
    origin: "Kermanshah (KSH)",
    destination: "Tehran (IKA)",
    departureTime: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 8 * 24 * 60 * 60 * 1000 + 1.3 * 60 * 60 * 1000
    ).toISOString(),
    price: 1050000,
    currency: "Toman",
    companyName: "Iran Air",
    flightNumber: "IR460",
    gate: "D2",
  },
];

/**
 * @description API route for retrieving information about a specific flight based on ID.
 * Only the GET method is supported.
 * @param {NextApiRequest} req The request object, including `req.query.id`.
 * @param {NextApiResponse<FlightTicket | { message: string }>} res The response object.
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FlightTicket | { message: string }>
) {
  const { id } = req.query; // id is extracted from the URL path (e.g., /api/flights/f123)

  if (req.method === "GET") {
    const flight = mockFlights.find((f) => f.id === id);

    if (flight) {
      res.status(200).json(flight);
    } else {
      res.status(404).json({ message: `Flight with ID ${id} not found.` });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
