// src/pages/buses/index.tsx
import Head from "next/head";
import { GetServerSideProps } from "next";
import TicketCard from "@/components/tickets/TicketCard";
import { BusTicket, TicketType } from "@/types/ticket";
import styles from "@/styles/pages/Listing.module.scss";
import { JSX } from "react";

interface BusesPageProps {
  buses: BusTicket[];
}

/**
 * @description Bus list page component.
 * This page is rendered using Server-Side Rendering (SSR) with getServerSideProps.
 * @param {BusesPageProps} props - Properties received from getServerSideProps.
 * @returns {JSX.Element} Bus list page.
 */
const BusesPage = ({ buses }: BusesPageProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Buses List | Ticket Store</title>
        <meta name="description" content="Search and view the list of available buses." />
      </Head>
      <div className={`container ${styles.listingContainer}`}>
        <h1 className={styles.pageTitle}>🚌 Buses List</h1>
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

// Mock data for buses (in a real application, this would be fetched from an API)
const mockBuses: BusTicket[] = [
  {
    id: "b101",
    type: TicketType.Bus,
    origin: "Isfahan (Kaveh Terminal)",
    destination: "Shiraz (Karandish Terminal)",
    departureTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // One day later
    arrivalTime: new Date(
      Date.now() + 1 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000
    ).toISOString(), // Six hours after departure
    price: 350000,
    currency: "Toman",
    companyName: "Hamsafar",
    busType: "VIP 25-Seater",
  },
  {
    id: "b102",
    type: TicketType.Bus,
    origin: "Tehran (South Terminal)",
    destination: "Mashhad (Imam Reza Terminal)",
    departureTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Two days later
    arrivalTime: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000
    ).toISOString(), // Twelve hours after departure
    price: 450000,
    currency: "Toman",
    companyName: "Seirosafar",
    busType: "VIP 32-Seater",
  },
  {
    id: "b103",
    type: TicketType.Bus,
    origin: "Tabriz (Central Terminal)",
    destination: "Ardabil (Main Terminal)",
    departureTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // Three days later
    arrivalTime: new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000
    ).toISOString(), // Four hours after departure
    price: 200000,
    currency: "Toman",
    companyName: "Hamsafar",
    busType: "Standard 44-Seater",
  },
  {
    id: "b104",
    type: TicketType.Bus,
    origin: "Yazd (Main Terminal)",
    destination: "Kerman (Adineh Terminal)",
    departureTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // Four days later
    arrivalTime: new Date(
      Date.now() + 4 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000
    ).toISOString(), // Five hours after departure
    price: 300000,
    currency: "Toman",
    companyName: "Royal Safar",
    busType: "VIP 25-Seater",
  },
];

/**
 * @description This function runs on the server for each request.
 * It provides bus data for rendering the page.
 * @returns {Promise<{ props: BusesPageProps }>} Page properties.
 */
export const getServerSideProps: GetServerSideProps<BusesPageProps> = async (context) => {
  // Simulate a small API response delay
  await new Promise((resolve) => setTimeout(resolve, 70)); // 70ms delay
  return {
    props: {
      buses: mockBuses,
    },
  };
};

export default BusesPage;
