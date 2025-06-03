// src/types/ticket.ts

export enum TicketType {
    Flight = 'flight',
    Train = 'train',
    Bus = 'bus',
  }
  
  export interface BaseTicket {
    id: string;
    type: TicketType;
    origin: string;
    destination: string;
    departureTime: string; // ISO 8601 date string
    arrivalTime: string;   // ISO 8601 date string
    price: number;
    currency: string;
    companyName: string;
  }
  
  export interface FlightTicket extends BaseTicket {
    type: TicketType.Flight;
    flightNumber: string;
    gate?: string; 
  }
  
  export interface TrainTicket extends BaseTicket {
    type: TicketType.Train;
    trainNumber: string;
    seatClass: string;
  }
  
  export interface BusTicket extends BaseTicket {
    type: TicketType.Bus;
    busType: string; 
    platform?: string; 
  }
  
  export type Ticket = FlightTicket | TrainTicket | BusTicket;