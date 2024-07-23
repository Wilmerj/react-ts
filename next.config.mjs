/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomfox.ca",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
