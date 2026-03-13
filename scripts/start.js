const { execSync } = require("child_process");

const service = process.env.SERVICE_NAME;

const port = process.env.PORT || "3000";

const commands = {
  "core-api": "cd apps/core && npx prisma migrate deploy && node dist/main",
  backoffice: `cd apps/backoffice-tokenization && npx next start -H 0.0.0.0 -p ${port}`,
  investor: `cd apps/investor-tokenization && npx next start -H 0.0.0.0 -p ${port}`,
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
