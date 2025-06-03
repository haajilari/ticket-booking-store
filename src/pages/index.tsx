// src/pages/index.tsx
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/pages/Home.module.scss"; // استایل‌های مخصوص این صفحه
import { JSX } from "react";

// Types from getStaticProps()
interface HomeProps {
  welcomeMessage: string;
  description: string;
}

/**
 * @description Home Page Comp
 * This Page Will Build By SSG
 * @param {HomeProps} props - Types from getStaticProps()
 * @returns {JSX.Element} Home Page Comp
 */
const HomePage = ({ welcomeMessage, description }: HomeProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Booking Tickets | Home Page</title>
        <meta
          name="description"
          content="Best Platform to Buy Tickets of All Types; Flights, Trains, Buses."
        />
        <meta property="og:title" content="Booking Tickets | Home Page" />
        <meta
          property="og:description"
          content="Reserve Online: Flights, Trains, Buses"
        />
        {/* <meta property="og:image" content="/images/og-image-home.jpg" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`container ${styles.homeContainer}`}>
        <header className={styles.heroSection}>
          <h1>{welcomeMessage}</h1>
          <p className={styles.description}>{description}</p>
        </header>

        <section className={styles.navigationCards}>
          <Link href="/flights" legacyBehavior>
            <a className={styles.card}>
              ✈️
              <h3>Flight</h3>
              <p>Internal/International Flights</p>
            </a>
          </Link>
          <Link href="/trains" legacyBehavior>
            <a className={styles.card}>
              🚆
              <h3>Train</h3>
              <p>Safe Trip All Around the Europe</p>
            </a>
          </Link>
          <Link href="/buses" legacyBehavior>
            <a className={styles.card}>
              🚌
              <h3>Bus</h3>
              <p>The Most Econmic Way To Trip</p>
            </a>
          </Link>
        </section>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  // Must Be ApiFetch
  const homeData = {
    welcomeMessage: "Welcome to The First Online Booking Ticket Store",
    description:
      "Select Destination, Pack Your Baggage, Join Us, Book Your Ticket, Here We Go!",
  };

  return {
    props: homeData,
    // revalidate: 3600,
  };
};

export default HomePage;
