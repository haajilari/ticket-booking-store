import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "export",
};
// Import next-pwa
const isExport = process.env.NEXT_EXPORT === "true";

const withPWA = require("next-pwa")({
  dest: "public", // Path to store Service Worker and related files (usually public)
  register: true, // Should the Service Worker be automatically registered on the client?
  skipWaiting: true, // Should a new Service Worker activate immediately (instead of waiting for all old tabs to close)?
  disable: isExport, // Disable PWA if static export is running
  // runtimeCaching: [...] // You can define caching strategies for runtime here (advanced)
});
// export default nextConfig;
module.exports = withPWA(nextConfig);
