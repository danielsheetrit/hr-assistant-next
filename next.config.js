/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
  },
};

module.exports = nextConfig;
