import type { NextConfig } from "next";

const isExport = process.env.npm_lifecycle_event === "build";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: isExport,
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  output: "export",
};

module.exports = withPWA(nextConfig);
