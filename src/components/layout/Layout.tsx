// src/components/layout/Layout.tsx
import React, { JSX, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

/**
 * @description Layout Comp
 * Arranged Header, Content, Footer
 * @param {LayoutProps} props - Propertioes
 * @param {ReactNode} props.children - Content Displayed
 * @returns {JSX.Element} Layout Comp
 */

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className={styles.layoutWrapper}>
      <Header />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
