/** @type {import('next').NextConfig} */
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    HOST: process.env.NEXT_PUBLIC_HOST
  }
};

module.exports = nextConfig;
