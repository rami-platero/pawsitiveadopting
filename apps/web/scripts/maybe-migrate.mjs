import { execSync } from "node:child_process";

if (process.env.AUTO_MIGRATE === "true") {
  console.log("AUTO_MIGRATE is set — running database migrations before build...");
  execSync("pnpm db:migrate", { stdio: "inherit" });
} else {
  console.log("AUTO_MIGRATE not set — skipping automatic migration.");
}
