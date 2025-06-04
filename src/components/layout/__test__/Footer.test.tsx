// src/components/layout/__tests__/Footer.test.tsx
import { render, screen } from "@testing-library/react";
import Footer from "../Footer"; // Correct path to the Footer component

describe("Footer Component", () => {
  it("should render the current year in the copyright notice", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear(); // 2025 based on current date
    // Use a regular expression for more flexibility in the text
    const copyrightText = screen.getByText(
      `© ${currentYear} Online Ticket Store. All rights reserved.`
    );
    expect(copyrightText).toBeInTheDocument();
  });

  it("should contain the copyright paragraph", () => {
    render(<Footer />);
    // Find the paragraph. If multiple paragraphs exist, a more specific selector would be needed.
    const paragraphElement = screen.getByRole("paragraph"); // Or screen.getByText(/Online Ticket Store/)
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement).toHaveTextContent("Online Ticket Store");
  });
});
