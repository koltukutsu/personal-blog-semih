import { Redis } from "@upstash/redis";

// Create a mock Redis implementation
const createMockRedis = () => {
  console.log("Using mock Redis implementation");
  return {
    hgetall: async () => ({}),
    hget: async () => null,
    hincrby: async () => 0,
    set: async () => null,
    get: async () => null,
  };
};

// Use real Redis only if token is provided
const redis = process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : createMockRedis();

export default redis;
