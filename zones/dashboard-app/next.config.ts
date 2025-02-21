import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath:"/dashboard",
  assetPrefix:"http://localhost:3001/dashboard",
  async headers() {
    return [
      {
        source:"/_next/static/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, // Allow all origins (or set "http://localhost:3000")
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-Requested-With, Content-Type" },
        ],
      }
    ]
  }
};

export default nextConfig;
