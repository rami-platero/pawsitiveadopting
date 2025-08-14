import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { fileURLToPath } from "node:url";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./src/env/server.ts")
jiti("./src/env/client.ts");

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
