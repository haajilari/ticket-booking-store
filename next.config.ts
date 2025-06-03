import type { NextConfig } from "next";

const isExport = process.env.npm_lifecycle_event === "build";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: false,
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  // output: "",
};

module.exports = withPWA(nextConfig);
