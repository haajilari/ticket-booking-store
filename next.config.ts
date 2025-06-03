import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};
// Import next-pwa
const withPWA = require("next-pwa")({
  dest: "public", // Path to store Service Worker and related files (usually public)
  register: true, // Should the Service Worker be automatically registered on the client?
  skipWaiting: true, // Should a new Service Worker activate immediately (instead of waiting for all old tabs to close)?
  disable: false, // Disable PWA in development mode (optional, but useful to avoid caching issues during development)
  // runtimeCaching: [...] // You can define caching strategies for runtime here (advanced)
});
// export default nextConfig;
module.exports = withPWA(nextConfig);
