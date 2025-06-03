// src/pages/flights/[id].tsx
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { FlightTicket, TicketType } from '@/types/ticket';
import styles from '@/styles/pages/TicketDetails.module.scss'; // A style file for ticket details
import Link from 'next/link';
import { JSX } from 'react';

interface FlightDetailPageProps {
  flight?: FlightTicket; // Ticket can be optional in case of an error
  error?: string;
}

/**
 * @description Date and time formatter. (Could be moved to a utils file)
 * @param {string | undefined} dateString - ISO date string.
 * @returns {string} Formatted date and time or an error message.
 */
const formatDetailedDateTime = (dateString?: string): string => {
  if (!dateString) return 'Unknown';
  try {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  } catch (e) {
    return 'Invalid date format';
  }
};

/**
 * @description Component for the details page of a specific flight.
 * Data is fetched via getServerSideProps using the flight ID from the API.
 * @param {FlightDetailPageProps} props - Page properties.
 * @returns {JSX.Element} The flight details page.
 */
const FlightDetailPage = ({ flight, error }: FlightDetailPageProps): JSX.Element => {
  if (error) {
    return (
      <div className={`container ${styles.detailsContainer}`}>
        <h1 className={styles.pageTitleError}>Error</h1>
        <p className={styles.errorMessage}>Unable to load flight details: {error}</p>
        <Link href="/flights" legacyBehavior><a className={styles.backLink}>Back to Flights List</a></Link>
      </div>
    );
  }

  if (!flight) {
    // This case should not occur if getSSP properly handles notFound,
    // but it is included for extra safety.
    return (
      <div className={`container ${styles.detailsContainer}`}>
        <h1 className={styles.pageTitleError}>Flight Not Found</h1>
        <p>Unfortunately, no flight with these details was found.</p>
        <Link href="/flights" legacyBehavior><a className={styles.backLink}>Back to Flights List</a></Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Flight Details {flight.companyName} {flight.flightNumber} | Ticket Store</title>
        <meta name="description" content={`Flight details for ${flight.companyName} from ${flight.origin} to ${flight.destination}`} />
      </Head>

      <div className={`container ${styles.detailsContainer}`}>
        <header className={styles.ticketHeader}>
          <h1>Flight Details</h1>
          <h2>{flight.companyName} - Flight Number: {flight.flightNumber}</h2>
        </header>

        <section className={styles.ticketInfo}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Origin:</span>
            <span className={styles.value}>{flight.origin}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Destination:</span>
            <span className={styles.value}>{flight.destination}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Departure Time:</span>
            <span className={styles.value}>{formatDetailedDateTime(flight.departureTime)}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Arrival Time:</span>
            <span className={styles.value}>{formatDetailedDateTime(flight.arrivalTime)}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Price:</span>
            <span className={`${styles.value} ${styles.price}`}>{flight.price.toLocaleString('en-US')} {flight.currency}</span>
          </div>
          {flight.gate && (
            <div className={styles.infoRow}>
              <span className={styles.label}>Gate:</span>
              <span className={styles.value}>{flight.gate}</span>
            </div>
          )}
          {/* Additional flight information can be displayed here */}
        </section>

        <div className={styles.actions}>
          <button className={styles.bookButton}>Book This Flight</button>
          <Link href="/flights" legacyBehavior><a className={styles.backLink}>Back to Flights List</a></Link>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<FlightDetailPageProps> = async (context) => {
  const { id } = context.params as { id: string }; // Retrieve id from route parameters
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  try {
    const response = await fetch(`${apiBaseUrl}/api/flights/${id}`);

    if (response.status === 404) {
      // If the API returns a 404 error (i.e., ticket not found)
      // context.res.statusCode = 404; // Set the response status code to 404
      return { notFound: true }; // Next.js will display the default 404 page
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch flight details, status: ${response.status}`);
    }

    const flightData: FlightTicket = await response.json();

    return {
      props: {
        flight: flightData,
      },
    };
  } catch (err) {
    console.error(`Error in getServerSideProps for flight ${id}:`, err);
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    // In case of any error (except 404, which is handled by notFound)
    // An error prop can be sent to the page to display an appropriate message.
    // Alternatively, the user could be redirected to a generic error page.
    return {
      props: {
        error: errorMessage,
      },
    };
  }
};

export default FlightDetailPage;