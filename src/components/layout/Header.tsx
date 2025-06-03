// src/components/layout/Header.tsx
import Link from "next/link";
import styles from "./Header.module.scss";
import { JSX } from "react";

/**
 * @description Header of App
 * Includes Logo, Pictures, etc.
 * @returns {JSX.Element} Header Component
 */
const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerContainer} container`}>
        <Link href="/" className={styles.logo}>
          Ticket Booking Store
        </Link>
        <nav className={styles.nav}>
          <Link href="/flights">Flights</Link>
          <Link href="/trains">Trains</Link>
          <Link href="/buses">Buses</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
