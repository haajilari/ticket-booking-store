// src/pages/trains/[id].tsx
import Head from "next/head";
import { GetServerSideProps } from "next";
import { TrainTicket } from "@/types/ticket";
import styles from "@/styles/pages/TicketDetails.module.scss";
import Link from "next/link";
import { JSX } from "react";
import BookingForm from "@/components/booking/BookingForm";
import { useBookingStore } from "@/store/bookingStore";
import { useEffect } from "react";
// The formatDetailedDateTime function can be copied from flights/[id].tsx
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

interface TrainDetailPageProps {
  train?: TrainTicket;
  error?: string;
}

/**
 * @description Component for the details page of a specific train.
 * Data is fetched via getServerSideProps using the train ID from the API.
 * @param {TrainDetailPageProps} props - Page properties.
 * @returns {JSX.Element} The train details page.
 */
const TrainDetailPage = ({ train, error }: TrainDetailPageProps): JSX.Element => {
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
        <p className={styles.errorMessage}>
          Unable to load train details: {bookingError}
        </p>
        <Link href="/trains" legacyBehavior>
          <a className={styles.backLink}>Back to Trains List</a>
        </Link>
      </div>
    );
  }
  if (bookingError) {
    return (
      <div className={`container ${styles.detailsContainer}`}>
        <h1 className={styles.pageTitleError}>Error</h1>
        <p className={styles.errorMessage}>
          Unable to load train details: {bookingError}
        </p>
        <Link href="/trains" legacyBehavior>
          <a className={styles.backLink}>Back to Trains List</a>
        </Link>
      </div>
    );
  }

  if (!train) {
    return (
      <div className={`container ${styles.detailsContainer}`}>
        <h1 className={styles.pageTitleError}>Train Not Found</h1>
        <Link href="/trains" legacyBehavior>
          <a className={styles.backLink}>Back to Trains List</a>
        </Link>
      </div>
    );
  }

  // Check if the success/error message pertains to the current ticket booking attempt
  const isCurrentTicketBookingAttempt = ticketForBooking?.id === train.id;
  return (
    <>
      <Head>
        <title>
          Train Details {train.companyName} {train.trainNumber} | Ticket Store
        </title>
        <meta
          name="description"
          content={`Train details for ${train.companyName} from ${train.origin} to ${train.destination}`}
        />
      </Head>
      <div className={`container ${styles.detailsContainer}`}>
        <header className={styles.ticketHeader}>
          <h1>Train Details</h1>
          <h2>
            {train.companyName} - Train Number: {train.trainNumber}
          </h2>
        </header>
        <section className={styles.ticketInfo}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Origin:</span>
            <span className={styles.value}>{train.origin}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Destination:</span>
            <span className={styles.value}>{train.destination}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Departure Time:</span>
            <span className={styles.value}>
              {formatDetailedDateTime(train.departureTime)}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Arrival Time:</span>
            <span className={styles.value}>
              {formatDetailedDateTime(train.arrivalTime)}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Seat Class:</span>
            <span className={styles.value}>{train.seatClass}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Price:</span>
            <span className={`${styles.value} ${styles.price}`}>
              {train.price.toLocaleString("en-US")} {train.currency}
            </span>
          </div>
        </section>
        {/* Display form or success/error message based on store state */}
        {isCurrentTicketBookingAttempt && bookingStatus === "succeeded" ? (
          <div className={styles.successMessageContainer}>
            <h3>Booking Successful!</h3>
            <p>
              Your booking for the {train.companyName} ticket has been successfully
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
              ticket={train}
              initialQuantity={
                train.id === useBookingStore.getState().ticketForBooking?.id
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
            <Link href="/trains" legacyBehavior>
              <a className={styles.backLink} style={{ marginTop: "1rem" }}>
                Back to Trains List
              </a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<TrainDetailPageProps> = async (
  context
) => {
  const { id } = (context.params as { id?: string }) || { id: undefined }; // Default to undefined if params is undefined
  if (!id) {
    return {
      notFound: true, // Return 404 if no id is provided
    };
  }
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  try {
    const response = await fetch(`${apiBaseUrl}/api/trains/${id}`);
    if (response.status === 404) return { notFound: true };
    if (!response.ok)
      throw new Error(`Failed to fetch train details, status: ${response.status}`);
    const trainData: TrainTicket = await response.json();
    return { props: { train: trainData } };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    return { props: { error: errorMessage } };
  }
};

export default TrainDetailPage;
