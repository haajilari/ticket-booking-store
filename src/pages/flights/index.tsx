// src/pages/flights/index.tsx
import Head from "next/head";
import { GetServerSideProps } from "next";
import TicketCard from "@/components/tickets/TicketCard";
import { FlightTicket, TicketType } from "@/types/ticket";
import styles from "@/styles/pages/Listing.module.scss"; // A general style file for listing pages
import { JSX } from "react";

// Define type for props received from getServerSideProps
interface FlightsPageProps {
  flights: FlightTicket[];
}

/**
 * @description Flights list page component.
 * This page is rendered using Server-Side Rendering (SSR) with getServerSideProps.
 * @param {FlightsPageProps} props - Properties received from getServerSideProps.
 * @returns {JSX.Element} Flights list page.
 */
const FlightsPage = ({ flights }: FlightsPageProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Flights List | Ticket Store</title>
        <meta
          name="description"
          content="Search and view the list of available flights."
        />
      </Head>

      <div className={`container ${styles.listingContainer}`}>
        <h1 className={styles.pageTitle}>✈️ Flights List</h1>
        {flights.length > 0 ? (
          <div className={styles.ticketList}>
            {flights.map((flight) => (
              <TicketCard key={flight.id} ticket={flight} />
            ))}
          </div>
        ) : (
          <p className={styles.noResults}>
            No flights available to display at the moment.
          </p>
        )}
      </div>
    </>
  );
};

// Mock data for flights (in a real application, this would be fetched from an API)
const mockFlights: FlightTicket[] = [
  {
    id: "f123",
    type: TicketType.Flight,
    origin: "Tehran (THR)",
    destination: "Mashhad (MHD)",
    departureTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Two days later
    arrivalTime: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
    ).toISOString(), // Two hours after departure
    price: 1500000,
    currency: "Toman",
    companyName: "Iran Air",
    flightNumber: "IR456",
  },
  {
    id: "f456",
    type: TicketType.Flight,
    origin: "Shiraz (SYZ)",
    destination: "Isfahan (IFN)",
    departureTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // Three days later
    arrivalTime: new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000
    ).toISOString(), // One and a half hours later
    price: 950000,
    currency: "Toman",
    companyName: "Mahan Air",
    flightNumber: "W5102",
  },
];

/**
 * @description This function runs on the server for each request.
 * It provides flight data for rendering the page.
 * @returns {Promise<{ props: FlightsPageProps }>} Page properties.
 */
export const getServerSideProps: GetServerSideProps<FlightsPageProps> = async (
  context
) => {
  // You can use context.req or context.query here to retrieve more information
  // and fetch data from a real API based on that.
  // Example: const apiResponse = await fetch('https://api.example.com/flights?params...');
  // const flightsData = await apiResponse.json();

  // For this example, we use mock data
  // Simulate a small API response delay
  await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms delay

  return {
    props: {
      flights: mockFlights,
    },
  };
};

export default FlightsPage;
