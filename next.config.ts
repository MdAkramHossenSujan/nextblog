import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "picsum.photos",             // for blog/demo images
      "randomuser.me",             // for placeholder avatars
      "lh3.googleusercontent.com", // Google profile avatars
      "kinde.com",                 // optional if Kinde sends avatars
    ],
  },
};

export default nextConfig;

