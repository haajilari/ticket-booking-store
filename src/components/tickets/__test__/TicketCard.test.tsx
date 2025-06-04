// src/components/tickets/__tests__/TicketCard.test.tsx
import { render, screen } from "@testing-library/react";
import TicketCard from "../TicketCard";
import { FlightTicket, TicketType } from "@/types/ticket"; // Required types

// Mock ticket data for testing
const mockFlightTicket: FlightTicket = {
  id: "test-flight-1",
  type: TicketType.Flight,
  origin: "Tehran",
  destination: "Mashhad",
  departureTime: new Date("2025-08-15T10:00:00Z").toISOString(),
  arrivalTime: new Date("2025-08-15T12:00:00Z").toISOString(),
  price: 1200000,
  currency: "IRR",
  companyName: "Test Airline",
  flightNumber: "TA123",
  gate: "A5",
};

describe("TicketCard Component", () => {
  it("should render ticket information correctly for a flight ticket", () => {
    render(<TicketCard ticket={mockFlightTicket} />);

    // Check airline company name
    expect(screen.getByText("Test Airline")).toBeInTheDocument();
    // Check price
    expect(screen.getByText("1,200,000 IRR")).toBeInTheDocument(); // Note the English number format
    // Check origin and destination
    expect(screen.getByText("Origin:")).toBeInTheDocument();
    expect(screen.getByText("Tehran")).toBeInTheDocument();
    expect(screen.getByText("Destination:")).toBeInTheDocument();
    expect(screen.getByText("Mashhad")).toBeInTheDocument();
    // Check flight number
    expect(screen.getByText(/Flight Number: TA123/i)).toBeInTheDocument();

    // Check details link
    const detailsLink = screen.getByRole("link", { name: /View Details and Purchase/i });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute("href", `/flights/${mockFlightTicket.id}`);
  });

  // You can add similar tests for TrainTicket and BusTicket with corresponding mock data
});
