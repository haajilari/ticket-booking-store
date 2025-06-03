// src/pages/api/trains/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { TrainTicket, TicketType } from '@/types/ticket';

// Mock data for trains
const mockTrains: TrainTicket[] = [
  {
    id: 't789',
    type: TicketType.Train,
    origin: 'Tehran',
    destination: 'Yazd',
    departureTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 7 * 60 * 60 * 1000).toISOString(),
    price: 850000,
    currency: 'Toman',
    companyName: 'Raja',
    trainNumber: 'T101',
    seatClass: '4-Bed Special',
  },
  {
    id: 't1011',
    type: TicketType.Train,
    origin: 'Mashhad',
    destination: 'Isfahan',
    departureTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000).toISOString(),
    price: 1100000,
    currency: 'Toman',
    companyName: 'Fadak',
    trainNumber: 'F205',
    seatClass: 'Business',
  },
  // Additional mock train data
  {
    id: 't1213',
    type: TicketType.Train,
    origin: 'Tabriz',
    destination: 'Tehran',
    departureTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000).toISOString(),
    price: 900000,
    currency: 'Toman',
    companyName: 'Raja',
    trainNumber: 'T302',
    seatClass: 'Economy',
  },
  {
    id: 't1415',
    type: TicketType.Train,
    origin: 'Shiraz',
    destination: 'Mashhad',
    departureTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000).toISOString(),
    price: 1300000,
    currency: 'Toman',
    companyName: 'Fadak',
    trainNumber: 'F408',
    seatClass: 'Business',
  },
  {
    id: 't1617',
    type: TicketType.Train,
    origin: 'Ahvaz',
    destination: 'Tehran',
    departureTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000).toISOString(),
    price: 950000,
    currency: 'Toman',
    companyName: 'Raja',
    trainNumber: 'T509',
    seatClass: '4-Bed Standard',
  },
  {
    id: 't1819',
    type: TicketType.Train,
    origin: 'Kerman',
    destination: 'Isfahan',
    departureTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000).toISOString(),
    price: 700000,
    currency: 'Toman',
    companyName: 'Fadak',
    trainNumber: 'F611',
    seatClass: 'Economy',
  },
  {
    id: 't2021',
    type: TicketType.Train,
    origin: 'Bandar Abbas',
    destination: 'Tehran',
    departureTime: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000).toISOString(),
    price: 1400000,
    currency: 'Toman',
    companyName: 'Raja',
    trainNumber: 'T712',
    seatClass: '6-Bed Standard',
  },
  {
    id: 't2223',
    type: TicketType.Train,
    origin: 'Qom',
    destination: 'Mashhad',
    departureTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000).toISOString(),
    price: 1000000,
    currency: 'Toman',
    companyName: 'Fadak',
    trainNumber: 'F813',
    seatClass: 'Business',
  },
  {
    id: 't2425',
    type: TicketType.Train,
    origin: 'Rasht',
    destination: 'Tehran',
    departureTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000).toISOString(),
    price: 600000,
    currency: 'Toman',
    companyName: 'Raja',
    trainNumber: 'T914',
    seatClass: 'Economy',
  },
  {
    id: 't2627',
    type: TicketType.Train,
    origin: 'Sari',
    destination: 'Yazd',
    departureTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000).toISOString(),
    price: 1050000,
    currency: 'Toman',
    companyName: 'Fadak',
    trainNumber: 'F015',
    seatClass: '4-Bed Special',
  },
  {
    id: 't2829',
    type: TicketType.Train,
    origin: 'Zanjan',
    destination: 'Shiraz',
    departureTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 13 * 60 * 60 * 1000).toISOString(),
    price: 1150000,
    currency: 'Toman',
    companyName: 'Raja',
    trainNumber: 'T116',
    seatClass: '6-Bed Standard',
  },
  {
    id: 't3031',
    type: TicketType.Train,
    origin: 'Kish',
    destination: 'Mashhad',
    departureTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    arrivalTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000).toISOString(),
    price: 1500000,
    currency: 'Toman',
    companyName: 'Fadak',
    trainNumber: 'F217',
    seatClass: 'Business',
  },
];

/**
 * @description API route for retrieving the list of all trains.
 * @param {NextApiRequest} req The request object.
 * @param {NextApiResponse<TrainTicket[] | { message: string }>} res The response object.
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TrainTicket[] | { message: string }>
) {
  if (req.method === 'GET') {
    // Simulate a small delay in the API response
    setTimeout(() => {
      res.status(200).json(mockTrains);
    }, 150); // 150 millisecond delay
  } else {
    // If another method is used, return a 405 (Method Not Allowed) error
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}