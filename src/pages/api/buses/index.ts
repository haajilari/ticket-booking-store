// src/pages/api/buses/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { BusTicket, TicketType } from "@/types/ticket";

// Mock data for buses
const mockBuses: BusTicket[] = [
  {
    id: "b101",
    type: TicketType.Bus,
    origin: "Isfahan (Kaveh Terminal)",
    destination: "Shiraz (Karandish Terminal)",
    departureTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 1 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000
    ).toISOString(),
    price: 350000,
    currency: "Toman",
    companyName: "Hamsafar",
    busType: "VIP 25-Seater",
    platform: "7",
  },
  {
    id: "b202",
    type: TicketType.Bus,
    origin: "Tabriz (Central Terminal)",
    destination: "Tehran (West Terminal)",
    departureTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000
    ).toISOString(),
    price: 420000,
    currency: "Toman",
    companyName: "Seir o Safar",
    busType: "Scania Standard",
  },
  // Additional mock bus data
  {
    id: "b303",
    type: TicketType.Bus,
    origin: "Mashhad (Imam Reza Terminal)",
    destination: "Tehran (South Terminal)",
    departureTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000
    ).toISOString(),
    price: 450000,
    currency: "Toman",
    companyName: "Hamsafar",
    busType: "VIP 25-Seater",
    platform: "12",
  },
  {
    id: "b404",
    type: TicketType.Bus,
    origin: "Yazd (Central Terminal)",
    destination: "Kerman (Adineh Terminal)",
    departureTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 4 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000
    ).toISOString(),
    price: 300000,
    currency: "Toman",
    companyName: "Seir o Safar",
    busType: "Volvo Standard",
    platform: "5",
  },
  {
    id: "b505",
    type: TicketType.Bus,
    origin: "Ahvaz (Central Terminal)",
    destination: "Shiraz (Karandish Terminal)",
    departureTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000 + 7 * 60 * 60 * 1000
    ).toISOString(),
    price: 380000,
    currency: "Toman",
    companyName: "Royal Safar",
    busType: "VIP 32-Seater",
    platform: "3",
  },
  {
    id: "b606",
    type: TicketType.Bus,
    origin: "Rasht (Gilan Terminal)",
    destination: "Tehran (West Terminal)",
    departureTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000
    ).toISOString(),
    price: 280000,
    currency: "Toman",
    companyName: "Seir o Safar",
    busType: "Scania Standard",
    platform: "9",
  },
  {
    id: "b707",
    type: TicketType.Bus,
    origin: "Bandar Abbas (Central Terminal)",
    destination: "Isfahan (Kaveh Terminal)",
    departureTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 6 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000
    ).toISOString(),
    price: 500000,
    currency: "Toman",
    companyName: "Hamsafar",
    busType: "VIP 25-Seater",
    platform: "4",
  },
  {
    id: "b808",
    type: TicketType.Bus,
    origin: "Qom (Central Terminal)",
    destination: "Mashhad (Imam Reza Terminal)",
    departureTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000
    ).toISOString(),
    price: 400000,
    currency: "Toman",
    companyName: "Royal Safar",
    busType: "Volvo Standard",
    platform: "6",
  },
  {
    id: "b909",
    type: TicketType.Bus,
    origin: "Zanjan (Central Terminal)",
    destination: "Tabriz (Central Terminal)",
    departureTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 4 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000
    ).toISOString(),
    price: 250000,
    currency: "Toman",
    companyName: "Seir o Safar",
    busType: "Scania Standard",
    platform: "8",
  },
  {
    id: "b1010",
    type: TicketType.Bus,
    origin: "Sari (Central Terminal)",
    destination: "Tehran (East Terminal)",
    departureTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000
    ).toISOString(),
    price: 320000,
    currency: "Toman",
    companyName: "Hamsafar",
    busType: "VIP 32-Seater",
    platform: "10",
  },
  {
    id: "b1111",
    type: TicketType.Bus,
    origin: "Kish (Central Terminal)",
    destination: "Shiraz (Karandish Terminal)",
    departureTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000
    ).toISOString(),
    price: 480000,
    currency: "Toman",
    companyName: "Royal Safar",
    busType: "VIP 25-Seater",
    platform: "2",
  },
  {
    id: "b1212",
    type: TicketType.Bus,
    origin: "Kermanshah (Central Terminal)",
    destination: "Ahvaz (Central Terminal)",
    departureTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000
    ).toISOString(),
    price: 390000,
    currency: "Toman",
    companyName: "Seir o Safar",
    busType: "Volvo Standard",
    platform: "11",
  },
];

/**
 * @description API route for retrieving the list of all buses.
 * @param {NextApiRequest} req The request object.
 * @param {NextApiResponse<BusTicket[] | { message: string }>} res The response object.
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BusTicket[] | { message: string }>
) {
  if (req.method === "GET") {
    // Simulate a small delay in the API response
    setTimeout(() => {
      res.status(200).json(mockBuses);
    }, 100); // 100 millisecond delay
  } else {
    // If another method is used, return a 405 (Method Not Allowed) error
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
