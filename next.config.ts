import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack(config) {
    config.watchOptions = {
      ignored: ['**/node_modules', '**/C:/Users/User/Application Data/**'],
    };
    return config;
  },
};

export default nextConfig;
