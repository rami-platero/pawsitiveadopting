import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://lh3.googleusercontent.com/**")],
  },
  transpilePackages: ["@pawsitiveadopting/ui"],
  cacheComponents: true
};

export default withNextIntl(nextConfig);
