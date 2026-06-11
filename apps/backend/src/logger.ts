import pino from "pino";

const isDevelopment = process.env.NODE_ENV !== "production";

const logger = pino({
  //remove pino pretty in production setting
  level: process.env.LOG_LEVEL || "info",
  ...(isDevelopment && {
    transport: { target: "pino-pretty" },
  }),
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "req.body.password",
      "req.body.token",
      "*.password",
      "*.passwordHash",
    ],
    censor: "[REDACTED]",
  },
});

export default logger;
