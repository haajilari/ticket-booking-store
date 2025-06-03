// src/pages/flights/index.tsx
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import TicketCard from '@/components/tickets/TicketCard';
import { FlightTicket } from '@/types/ticket'; // TicketType is not needed here directly
import styles from '@/styles/pages/Listing.module.scss';
import { JSX } from 'react';

interface FlightsPageProps {
  flights: FlightTicket[];
  error?: string; // For displaying errors if an issue occurs
}

/**
 * @description Component for the flights list page.
 * This page is rendered server-side using getServerSideProps and fetches data from the API.
 * @param {FlightsPageProps} props - Properties received from getServerSideProps.
 * @returns {JSX.Element} The flights list page.
 */
const FlightsPage = ({ flights, error }: FlightsPageProps): JSX.Element => {
  if (error) {
    return (
      <div className={`container ${styles.listingContainer}`}>
        <h1 className={styles.pageTitle}>✈️ Flights List</h1>
        <p className={styles.noResults}>Error fetching data: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Flights List | Ticket Store</title>
        <meta name="description" content="Search and view the list of available flights." />
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
          <p className={styles.noResults}>No flights available to display at the moment.</p>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<FlightsPageProps> = async (context) => {
  try {
    // Base API URL - in a real application, this should be read from environment variables
    // On the server, we can use localhost and the application's port
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${apiBaseUrl}/api/flights`);

    if (!response.ok) {
      // If the API response is not successful (e.g., 500 error from the API)
      throw new Error(`Failed to fetch flights, status: ${response.status}`);
    }

    const flightsData: FlightTicket[] = await response.json();

    return {
      props: {
        flights: flightsData,
      },
    };
  } catch (err) {
    console.error('Error in getServerSideProps for flights:', err);
    // Send error to the client for display
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return {
      props: {
        flights: [],
        error: errorMessage,
      },
    };
  }
};

export default FlightsPage;