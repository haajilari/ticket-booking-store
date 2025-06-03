// src/components/tickets/TicketCard.tsx
import Link from "next/link";
import { Ticket, TicketType } from "@/types/ticket";
import styles from "./TicketCard.module.scss";
import { JSX } from "react";

interface TicketCardProps {
  ticket: Ticket;
}

/**
 * @description Date and time formatter.
 * @param {string} dateString - ISO date string.
 * @returns {string} Formatted date and time.
 */

const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString("en-US")} at ${date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

/**
 * @description Card component for displaying ticket information.
 * @param {TicketCardProps} props - Component properties.
 * @param {Ticket} props.ticket - Ticket data object.
 * @returns {JSX.Element} Ticket card component.
 */
const TicketCard = ({ ticket }: TicketCardProps): JSX.Element => {
  const getTicketSpecificDetails = () => {
    switch (ticket.type) {
      case TicketType.Flight:
        return <p>Flight Number: {ticket.flightNumber}</p>;
      case TicketType.Train:
        return (
          <p>
            Train: {ticket.trainNumber} - Class: {ticket.seatClass}
          </p>
        );
      case TicketType.Bus:
        return <p>Bus Type: {ticket.busType}</p>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{ticket.companyName}</h3>
        <span className={styles.price}>
          {ticket.price.toLocaleString("en-US")} {ticket.currency}
        </span>
      </div>
      <div className={styles.details}>
        <p>
          <strong>Origin:</strong> {ticket.origin}
        </p>
        <p>
          <strong>Destination:</strong> {ticket.destination}
        </p>
        <p>
          <strong>Departure:</strong> {formatDateTime(ticket.departureTime)}
        </p>
        <p>
          <strong>Arrival:</strong> {formatDateTime(ticket.arrivalTime)}
        </p>
        {getTicketSpecificDetails()}
      </div>
      <Link href={`/${ticket.type}s/${ticket.id}`} legacyBehavior>
        <a className={styles.detailsLink}>View Details and Purchase</a>
      </Link>
    </div>
  );
};

export default TicketCard;
