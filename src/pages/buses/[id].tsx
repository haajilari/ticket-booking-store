// src/pages/buses/[id].tsx
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { BusTicket } from '@/types/ticket';
import styles from '@/styles/pages/TicketDetails.module.scss';
import Link from 'next/link';
import { JSX } from 'react';

// The formatDetailedDateTime function can be copied from flights/[id].tsx
// or better yet, moved to a utils/formatters.ts file and imported from there.
const formatDetailedDateTime = (dateString?: string): string => {
  if (!dateString) return 'Unknown';
  try {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  } catch (e) {
    return 'Invalid date format';
  }
};

interface BusDetailPageProps {
  bus?: BusTicket;
  error?: string;
}

/**
 * @description Component for the details page of a specific bus.
 * Data is fetched via getServerSideProps using the bus ID from the API.
 * @param {BusDetailPageProps} props - Page properties.
 * @returns {JSX.Element} The bus details page.
 */
const BusDetailPage = ({ bus, error }: BusDetailPageProps): JSX.Element => {
  if (error) {
    return (
      <div className={`container ${styles.detailsContainer}`}>
        <h1 className={styles.pageTitleError}>Error</h1>
        <p className={styles.errorMessage}>Unable to load bus details: {error}</p>
        <Link href="/buses" legacyBehavior><a className={styles.backLink}>Back to Buses List</a></Link>
      </div>
    );
  }

  if (!bus) {
    return (
      <div className={`container ${styles.detailsContainer}`}>
        <h1 className={styles.pageTitleError}>Bus Not Found</h1>
        <Link href="/buses" legacyBehavior><a className={styles.backLink}>Back to Buses List</a></Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Bus Details {bus.companyName} | Ticket Store</title>
        <meta name="description" content={`Bus details for ${bus.companyName} from ${bus.origin} to ${bus.destination}`} />
      </Head>
      <div className={`container ${styles.detailsContainer}`}>
        <header className={styles.ticketHeader}>
          <h1>Bus Details</h1>
          <h2>{bus.companyName} - Type: {bus.busType}</h2>
        </header>
        <section className={styles.ticketInfo}>
          <div className={styles.infoRow}><span className={styles.label}>Origin:</span><span className={styles.value}>{bus.origin}</span></div>
          <div className={styles.infoRow}><span className={styles.label}>Destination:</span><span className={styles.value}>{bus.destination}</span></div>
          <div className={styles.infoRow}><span className={styles.label}>Departure Time:</span><span className={styles.value}>{formatDetailedDateTime(bus.departureTime)}</span></div>
          <div className={styles.infoRow}><span className={styles.label}>Arrival Time:</span><span className={styles.value}>{formatDetailedDateTime(bus.arrivalTime)}</span></div>
          {bus.platform && <div className={styles.infoRow}><span className={styles.label}>Platform:</span><span className={styles.value}>{bus.platform}</span></div>}
          <div className={styles.infoRow}><span className={styles.label}>Price:</span><span className={`${styles.value} ${styles.price}`}>{bus.price.toLocaleString('en-US')} {bus.currency}</span></div>
        </section>
        <div className={styles.actions}>
          <button className={styles.bookButton}>Book This Bus</button>
          <Link href="/buses" legacyBehavior><a className={styles.backLink}>Back to Buses List</a></Link>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<BusDetailPageProps> = async (context) => {
  const { id } = context.params as { id: string };
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  try {
    const response = await fetch(`${apiBaseUrl}/api/buses/${id}`);
    if (response.status === 404) return { notFound: true };
    if (!response.ok) throw new Error(`Failed to fetch bus details, status: ${response.status}`);
    const busData: BusTicket = await response.json();
    return { props: { bus: busData } };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return { props: { error: errorMessage } };
  }
};

export default BusDetailPage;