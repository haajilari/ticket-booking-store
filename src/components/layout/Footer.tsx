// src/components/layout/Footer.tsx
import { JSX } from "react";
import styles from "./Footer.module.scss";

/**
 * @description Footer Comp
 * Copyright and Usefull Links
 * @returns {JSX.Element} Footer Comp
 */
const Footer = (): JSX.Element => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>&copy; {currentYear} Feel Free to Use it!</p>
      </div>
    </footer>
  );
};

export default Footer;
