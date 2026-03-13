const { execSync } = require("child_process");

const service = process.env.SERVICE_NAME;

const commands = {
  "core-api": "cd apps/core && npx prisma migrate deploy && node dist/main",
  backoffice:
    "cd apps/backoffice-tokenization && node .next/standalone/apps/backoffice-tokenization/server.js",
  investor:
    "cd apps/investor-tokenization && node .next/standalone/apps/investor-tokenization/server.js",
};

if (!service || !commands[service]) {
  console.error(
    `Unknown SERVICE_NAME: "${service}". Expected: ${Object.keys(commands).join(", ")}`,
  );
  console.log("Falling back to turbo run start (local dev)...");
  execSync("npx turbo run start", { stdio: "inherit" });
} else {
  console.log(`Starting ${service}...`);
  execSync(commands[service], { stdio: "inherit" });
}
