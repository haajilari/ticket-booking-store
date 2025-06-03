// src/pages/trains/index.tsx
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import TicketCard from '@/components/tickets/TicketCard';
import { TrainTicket, TicketType } from '@/types/ticket';
import styles from '@/styles/pages/Listing.module.scss';
import { JSX } from 'react';

interface TrainsPageProps {
  trains: TrainTicket[];
}

/**
 * @description Train list page component.
 * This page is rendered using Server-Side Rendering (SSR) with getServerSideProps.
 * @param {TrainsPageProps} props - Properties received from getServerSideProps.
 * @returns {JSX.Element} Train list page.
 */
const TrainsPage = ({ trains }: TrainsPageProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Trains List | Ticket Store</title>
        <meta name="description" content="Search and view the list of available trains." />
      </Head>
      <div className={`container ${styles.listingContainer}`}>
        <h1 className={styles.pageTitle}>🚆 Trains List</h1>
        {trains.length > 0 ? (
          <div className={styles.ticketList}>
            {trains.map((train) => (
              <TicketCard key={train.id} ticket={train} />
            ))}
          </div>
        ) : (
          <p className={styles.noResults}>No trains available to display at the moment.</p>
        )}
      </div>
    </>
  );
};

// Mock data for trains (in a real application, this would be fetched from an API)
const mockTrains: TrainTicket[] = [
  {
    id: 't789',
    type: TicketType.Train,
    origin: 'Tehran',
    destination: 'Yazd',
    departureTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // Four days later
    arrivalTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 7 * 60 * 60 * 1000).toISOString(), // Seven hours after departure
    price: 850000,
    currency: 'Toman',
    companyName: 'Raja',
    trainNumber: 'T101',
    seatClass: '4-Bed Special',
  },
  {
    id: 't790',
    type: TicketType.Train,
    origin: 'Mashhad',
    destination: 'Shiraz',
    departureTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // Five days later
    arrivalTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000).toISOString(), // Ten hours after departure
    price: 1200000,
    currency: 'Toman',
    companyName: 'Fadak',
    trainNumber: 'T202',
    seatClass: '5-Star Luxury',
  },
  {
    id: 't791',
    type: TicketType.Train,
    origin: 'Isfahan',
    destination: 'Bandar Abbas',
    departureTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // Three days later
    arrivalTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000).toISOString(), // Twelve hours after departure
    price: 950000,
    currency: 'Toman',
    companyName: 'Raja',
    trainNumber: 'T303',
    seatClass: '6-Bed Economy',
  },
  {
    id: 't792',
    type: TicketType.Train,
    origin: 'Tabriz',
    destination: 'Tehran',
    departureTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Two days later
    arrivalTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000).toISOString(), // Eight hours after departure
    price: 700000,
    currency: 'Toman',
    companyName: 'Fadak',
    trainNumber: 'T404',
    seatClass: '4-Bed Standard',
  },
];

/**
 * @description This function runs on the server for each request.
 * It provides train data for rendering the page.
 * @returns {Promise<{ props: TrainsPageProps }>} Page properties.
 */
export const getServerSideProps: GetServerSideProps<TrainsPageProps> = async (context) => {
  // Simulate a small API response delay
  await new Promise(resolve => setTimeout(resolve, 50)); // 50ms delay
  return {
    props: {
      trains: mockTrains,
    },
  };
};

export default TrainsPage;
