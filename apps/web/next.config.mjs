/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Generates static export
  // Optional configurations
  trailingSlash: true,
  images: {
    unoptimized: true, // For static image exports
  },
};

export default nextConfig;
