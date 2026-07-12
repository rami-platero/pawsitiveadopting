import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://lh3.googleusercontent.com/**"),
      new URL("https://images.unsplash.com/**"),
      { hostname: "images.unsplash.com", protocol: "https", port: "" },
    ],
  },
  transpilePackages: ["@pawsitiveadopting/ui"],
  cacheComponents: true,
};

export default withNextIntl(nextConfig);
