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
    // Добавление правила для игнорирования файлов, содержащих WindowsApps
    config.module.rules.push({
      test: /WindowsApps/,
      use: 'ignore-loader',
      exclude: /C:\\Users\\User\\AppData\\Local\\Microsoft\\WindowsApps\\GameBarElevatedFT_Alias.exe/,
    });
    
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
