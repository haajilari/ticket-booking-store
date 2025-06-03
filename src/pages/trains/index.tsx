// src/pages/trains/index.tsx
import Head from "next/head";
import { GetServerSideProps } from "next";
import TicketCard from "@/components/tickets/TicketCard";
import { TrainTicket } from "@/types/ticket"; // TicketType is not needed here directly
import styles from "@/styles/pages/Listing.module.scss";
import { JSX } from "react";

interface TrainsPageProps {
  trains: TrainTicket[];
  error?: string; // For displaying errors if an issue occurs
}

/**
 * @description Component for the trains list page.
 * This page is rendered server-side using getServerSideProps and fetches data from the API.
 * @param {TrainsPageProps} props - Properties received from getServerSideProps.
 * @returns {JSX.Element} The trains list page.
 */
const TrainsPage = ({ trains, error }: TrainsPageProps): JSX.Element => {
  if (error) {
    return (
      <div className={`container ${styles.listingContainer}`}>
        <h1 className={styles.pageTitle}>✈️ Trains List</h1>
        <p className={styles.noResults}>Error fetching data: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Trains List | Ticket Store</title>
        <meta
          name="description"
          content="Search and view the list of available trains."
        />
      </Head>

      <div className={`container ${styles.listingContainer}`}>
        <h1 className={styles.pageTitle}>✈️ Trains List</h1>
        {trains.length > 0 ? (
          <div className={styles.ticketList}>
            {trains.map((train) => (
              <TicketCard key={train.id} ticket={train} />
            ))}
          </div>
        ) : (
          <p className={styles.noResults}>
            No trains available to display at the moment.
          </p>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<TrainsPageProps> = async (
  context
) => {
  try {
    // Base API URL - in a real application, this should be read from environment variables
    // On the server, we can use localhost and the application's port
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${apiBaseUrl}/api/trains`);

    if (!response.ok) {
      // If the API response is not successful (e.g., 500 error from the API)
      throw new Error(`Failed to fetch trains, status: ${response.status}`);
    }

    const trainsData: TrainTicket[] = await response.json();

    return {
      props: {
        trains: trainsData,
      },
    };
  } catch (err) {
    console.error("Error in getServerSideProps for trains:", err);
    // Send error to the client for display
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    return {
      props: {
        trains: [],
        error: errorMessage,
      },
    };
  }
};

export default TrainsPage;
