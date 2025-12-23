import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const isProduction = process.env.NODE_ENV === "production";

export const ratelimit = isProduction
    ? new Ratelimit({
          redis: Redis.fromEnv(),
          limiter: Ratelimit.slidingWindow(10, "10 s"),
          analytics: true,
          prefix: "@upstash/ratelimit",
      })
    : null;
