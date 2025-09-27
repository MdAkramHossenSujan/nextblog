import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "picsum.photos",             // for blog/demo images
      "randomuser.me",             // for placeholder avatars
      "lh3.googleusercontent.com", // Google profile avatars
      "kinde.com", 
        "i.ibb.co",              // optional if Kinde sends avatars
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // allow larger file uploads (adjust if needed)
    },
  },
};

export default nextConfig;
