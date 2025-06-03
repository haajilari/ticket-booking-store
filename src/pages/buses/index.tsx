// src/pages/buses/index.tsx
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import TicketCard from '@/components/tickets/TicketCard';
import { BusTicket } from '@/types/ticket'; // TicketType is not needed here directly
import styles from '@/styles/pages/Listing.module.scss';
import { JSX } from 'react';

interface BusesPageProps {
  buses: BusTicket[];
  error?: string; // For displaying errors if an issue occurs
}

/**
 * @description Component for the buses list page.
 * This page is rendered server-side using getServerSideProps and fetches data from the API.
 * @param {BusesPageProps} props - Properties received from getServerSideProps.
 * @returns {JSX.Element} The buses list page.
 */
const BusesPage = ({ buses, error }: BusesPageProps): JSX.Element => {
  if (error) {
    return (
      <div className={`container ${styles.listingContainer}`}>
        <h1 className={styles.pageTitle}>✈️ Buses List</h1>
        <p className={styles.noResults}>Error fetching data: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Buses List | Ticket Store</title>
        <meta name="description" content="Search and view the list of available buses." />
      </Head>

      <div className={`container ${styles.listingContainer}`}>
        <h1 className={styles.pageTitle}>✈️ Buses List</h1>
        {buses.length > 0 ? (
          <div className={styles.ticketList}>
            {buses.map((bus) => (
              <TicketCard key={bus.id} ticket={bus} />
            ))}
          </div>
        ) : (
          <p className={styles.noResults}>No buses available to display at the moment.</p>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<BusesPageProps> = async (context) => {
  try {
    // Base API URL - in a real application, this should be read from environment variables
    // On the server, we can use localhost and the application's port
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${apiBaseUrl}/api/buses`);

    if (!response.ok) {
      // If the API response is not successful (e.g., 500 error from the API)
      throw new Error(`Failed to fetch buses, status: ${response.status}`);
    }

    const busesData: BusTicket[] = await response.json();

    return {
      props: {
        buses: busesData,
      },
    };
  } catch (err) {
    console.error('Error in getServerSideProps for buses:', err);
    // Send error to the client for display
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return {
      props: {
        buses: [],
        error: errorMessage,
      },
    };
  }
};

export default BusesPage;