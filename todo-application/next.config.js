/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_END_POINT: process.env.API_END_POINT,
  },
};

module.exports = nextConfig;
