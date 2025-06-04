# Next.js Ticket Booking Store

This project is a comprehensive ticket booking store for flights, trains, and buses, built with Next.js and TypeScript. It was developed as part of a step-by-step tutorial to demonstrate various features and best practices of the Next.js framework.

## Description

The application allows users to browse different types of tickets, view details for specific tickets, and simulate a booking process. It showcases Server-Side Rendering (SSR) for dynamic content, Static Site Generation (SSG) for static pages, API route handling for backend logic, and Progressive Web App (PWA) features.

## Features Implemented

- **Core Next.js Features**:
  - Pages Router for file-system based routing.
  - Server-Side Rendering (SSR) with `getServerSideProps` for ticket listing pages.
  - Static Site Generation (SSG) with `getStaticProps` for the homepage.
  - API Routes for backend logic (fetching data, simulating bookings).
  - Dynamic Routes for individual ticket detail pages and specific API endpoints.
  - Custom `_app.tsx` for global layouts and styles.
  - Custom `_document.tsx` for augmenting the HTML structure.
- **TypeScript**: Full TypeScript support for type safety and improved developer experience.
- **Styling**:
  - Sass for advanced CSS preprocessing.
  - CSS Modules for component-scoped styles.
  - Mobile-First design approach.
- **State Management**: Global state management using Zustand for handling the booking process.
- **Progressive Web App (PWA)**:
  - `manifest.json` for application metadata.
  - Service Worker registration and caching strategies via `next-pwa`.
  - "Add to Home Screen" support.
- **Mock Backend**: API routes to serve mock ticket data and simulate booking submissions.
- **Documentation**: JSDoc comments for components, functions, and API routes.
- **Unit Testing**: Setup for unit tests using Jest and React Testing Library, with example tests for components and API routes.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React](https://react.dev/)
- **Styling**: [Sass](https://sass-lang.com/), CSS Modules
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **PWA**: [next-pwa](https://github.com/shadowwalker/next-pwa)
- **Testing**: [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- **Linting**: ESLint (configured by Next.js)

## Project Structure

The project follows a standard Next.js structure with the main application code residing in the `src/` directory:

- `src/components/`: Reusable React components.
- `src/pages/`: Application pages and API routes.
  - `src/pages/api/`: Backend API endpoints.
- `src/store/`: Zustand store for global state management.
- `src/styles/`: Global styles, Sass variables, and page/component-specific styles.
- `src/types/`: TypeScript type definitions.
- `public/`: Static assets, including PWA icons and `manifest.json`.
- `__tests__/` (within component/page directories): Unit test files.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

To get a local copy up and running, follow these simple steps:

1.  **Clone the repository (if applicable)**

    ```bash
    # git clone <repository-url>
    # cd ticket-booking-store
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Run the Development Server**
    The application will be available at `http://localhost:3000`.

    ```bash
    npm run dev
    # or
    # yarn dev
    ```

4.  **Build for Production**

    ```bash
    npm run build
    # or
    # yarn build
    ```

5.  **Run in Production Mode**
    The application will start in production mode (requires a build first).

    ```bash
    npm start
    # or
    # yarn start
    ```

6.  **Run Tests**
    ```bash
    npm test
    # or to run in watch mode:
    # npm run test:watch
    # or for coverage report:
    # npm run test:cov
    ```

## Key Next.js Concepts Covered

This project provides practical examples of the following Next.js concepts:

- **Pages Router**: File-system routing within the `pages` directory.
- **Data Fetching**:
  - `getStaticProps` for Static Site Generation (SSG).
  - `getServerSideProps` for Server-Side Rendering (SSR).
- **API Routes**: Creating backend endpoints within `pages/api`.
- **Dynamic Routing**: Creating pages and API routes with dynamic segments (e.g., `[id].tsx`).
- **Custom App (`_app.tsx`)**: Initializing pages, global layouts.
- **Custom Document (`_document.tsx`)**: Modifying `<html>` and `<body>` tags, adding PWA meta tags.
- **`next/head`**: Managing document head elements per page for SEO and metadata.
- **`next/link`**: Client-side navigation between pages.
- **PWA Support**: Leveraging `next-pwa` for Service Worker and manifest generation.

## Potential Future Enhancements

- Implement a real database (e.g., PostgreSQL, MongoDB) instead of mock data.
- Add user authentication and authorization (e.g., NextAuth.js).
- Integrate a payment gateway for actual bookings.
- Expand test coverage with more unit tests, integration tests, and E2E tests (e.g., using Cypress or Playwright).
- Refactor to use the Next.js App Router and Server Components.
- Implement more advanced PWA features like push notifications or more sophisticated offline strategies.

---

This project was built as part of a guided tutorial to learn and demonstrate Next.js capabilities.
