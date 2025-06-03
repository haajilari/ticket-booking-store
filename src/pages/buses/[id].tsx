// src/pages/buses/[id].tsx
import Head from "next/head";
import { GetServerSideProps } from "next";
import { BusTicket } from "@/types/ticket";
import styles from "@/styles/pages/TicketDetails.module.scss";
import Link from "next/link";
import { JSX } from "react";
import BookingForm from "@/components/booking/BookingForm";
import { useBookingStore } from "@/store/bookingStore";
import { useEffect } from "react";

// The formatDetailedDateTime function can be copied from buses/[id].tsx
// or better yet, moved to a utils/formatters.ts file and imported from there.
const formatDetailedDateTime = (dateString?: string): string => {
  if (!dateString) return "Unknown";
  try {
    const date = new Date(dateString);
    return `${date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}, ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
  } catch (e) {
    return "Invalid date format";
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
  const { bookingStatus, bookingError, resetBookingState, ticketForBooking } =
    useBookingStore();
  // to prepare for the next booking, unless a booking is in progress.
  useEffect(() => {
    return () => {
      // Reset only if the booking is not in progress or pertains to a different ticket
      if (bookingStatus !== "loading") {
        // resetBookingState(); // This might be too early if the user wants to see the success message
      }
    };
  }, [bookingStatus, resetBookingState]);
  if (bookingError) {
    return (
      <div className={`container ${styles.detailsContainer}`}>
        <h1 className={styles.pageTitleError}>Error</h1>
        <p className={styles.errorMessage}>Unable to load bus details: {bookingError}</p>
        <Link href="/buses" legacyBehavior>
          <a className={styles.backLink}>Back to Buses List</a>
        </Link>
      </div>
    );
  }

  if (!bus) {
    return (
      <div className={`container ${styles.detailsContainer}`}>
        <h1 className={styles.pageTitleError}>Bus Not Found</h1>
        <Link href="/buses" legacyBehavior>
          <a className={styles.backLink}>Back to Buses List</a>
        </Link>
      </div>
    );
  }

  // Check if the success/error message pertains to the current ticket booking attempt
  const isCurrentTicketBookingAttempt = ticketForBooking?.id === bus.id;
  return (
    <>
      <Head>
        <title>Bus Details {bus.companyName} | Ticket Store</title>
        <meta
          name="description"
          content={`Bus details for ${bus.companyName} from ${bus.origin} to ${bus.destination}`}
        />
      </Head>
      <div className={`container ${styles.detailsContainer}`}>
        <header className={styles.ticketHeader}>
          <h1>Bus Details</h1>
          <h2>
            {bus.companyName} - Type: {bus.busType}
          </h2>
        </header>
        <section className={styles.ticketInfo}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Origin:</span>
            <span className={styles.value}>{bus.origin}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Destination:</span>
            <span className={styles.value}>{bus.destination}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Departure Time:</span>
            <span className={styles.value}>
              {formatDetailedDateTime(bus.departureTime)}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Arrival Time:</span>
            <span className={styles.value}>
              {formatDetailedDateTime(bus.arrivalTime)}
            </span>
          </div>
          {bus.platform && (
            <div className={styles.infoRow}>
              <span className={styles.label}>Platform:</span>
              <span className={styles.value}>{bus.platform}</span>
            </div>
          )}
          <div className={styles.infoRow}>
            <span className={styles.label}>Price:</span>
            <span className={`${styles.value} ${styles.price}`}>
              {bus.price.toLocaleString("en-US")} {bus.currency}
            </span>
          </div>
        </section>

        {/* Display form or success/error message based on store state */}
        {isCurrentTicketBookingAttempt && bookingStatus === "succeeded" ? (
          <div className={styles.successMessageContainer}>
            <h3>Booking Successful!</h3>
            <p>
              Your booking for the {bus.companyName} ticket has been successfully
              (simulated) registered.
            </p>
            <button
              onClick={() => {
                resetBookingState();
                // We might want to navigate to the homepage or ticket list
                // router.push('/');
              }}
              className={styles.backLink}
              style={{
                background: "#1DA1F2",
                color: "white",
                padding: "0.5em 1em",
                borderRadius: "4px",
                border: "none",
              }}
            >
              Start New Booking
            </button>
          </div>
        ) : (
          <>
            <BookingForm
              ticket={bus}
              initialQuantity={
                bus.id === useBookingStore.getState().ticketForBooking?.id
                  ? useBookingStore.getState().quantity
                  : 1
              }
            />
            {/* Display booking error from store if it pertains to this ticket */}
            {isCurrentTicketBookingAttempt &&
              bookingStatus === "failed" &&
              bookingError && (
                <p
                  className={`${styles.errorMessage} ${styles.formSubmissionError}`}
                  style={{ marginTop: "1rem" }}
                >
                  Booking Error: {bookingError}
                </p>
              )}
          </>
        )}

        {/* Back link if booking is not successful or not yet completed */}
        {!(isCurrentTicketBookingAttempt && bookingStatus === "succeeded") && (
          <div
            className={styles.actions}
            style={{ visibility: bookingStatus === "loading" ? "hidden" : "visible" }}
          >
            <Link href="/buses" legacyBehavior>
              <a className={styles.backLink} style={{ marginTop: "1rem" }}>
                Back to Buses List
              </a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<BusDetailPageProps> = async (
  context
) => {
  const { id } = context.params as { id: string };
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  try {
    const response = await fetch(`${apiBaseUrl}/api/buses/${id}`);
    if (response.status === 404) return { notFound: true };
    if (!response.ok)
      throw new Error(`Failed to fetch bus details, status: ${response.status}`);
    const busData: BusTicket = await response.json();
    return { props: { bus: busData } };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    return { props: { error: errorMessage } };
  }
};

export default BusDetailPage;
