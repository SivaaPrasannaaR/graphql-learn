import Redis from "ioredis"

const redisHost = "redis" || process.env.REDIS_HOST
const redisPort = 6379 || parseInt(process.env.REDIS_PORT!)

const redis = new Redis({
  host: redisHost, // Use the service name
  port: redisPort,
  password: process.env.REDIS_PASSWORD || undefined, // If you set a password
})

class RedisController {
  private client: Redis

  constructor() {
    this.client = redis
    this.client.on("error", (err) => console.error("Redis Client Error:", err))
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value)
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key)
  }

  async delete(key: string): Promise<number> {
    return this.client.del(key)
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key)
    return result === 1
  }

  async close(): Promise<void> {
    await this.client.quit()
  }
}

export const redisController = new RedisController()

export default redis
