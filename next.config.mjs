/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a self-contained build (.next/standalone) so the Docker image
  // stays tiny and has zero install step at runtime.
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
