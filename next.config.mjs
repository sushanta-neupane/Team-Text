/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  env: {
    SOCKET_SERVER_URL: process.env.SOCKET_SERVER_URL,
    BASE_URL : process.env.BASE_URL,
    SOCKET_SERVER_URLL : process.env.SOCKET_SERVER_URLL,
  }
};

export default nextConfig;
