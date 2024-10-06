import kafkaController from "./db/kafka"
import redis from "./db/redisClient"
import User from "./models/User"

const resolvers = {
  Query: {
    async getAllUsers() {
      // Produce a message
      await kafkaController.sendMessage("user-topic", "getAllUsers: ")

      // Fetch all users from the MongoDB collection
      return await User.find({})
    },
    async getUser(_: any, { id }: { id: string }) {
      // Check if the user is in Redis cache
      const cachedUser = await redis.get(`user:${id}`)
      if (cachedUser) {
        return JSON.parse(cachedUser)
      }

      // If not in Redis, fetch from MongoDB
      const user = await User.findById(id)
      if (user) {
        // Cache the result in Redis for future requests
        await redis.set(`user:${id}`, JSON.stringify(user), "EX", 3600) // Cache for 1 hour
      }

      await kafkaController.sendMessage(
        "user-topic",
        "getUser: " + JSON.stringify(user)
      )

      return user
    },
  },
  Mutation: {
    async addUser(_: any, { name, age }: { name: string; age: number }) {
      // Create a new user
      const newUser = new User({ name, age })
      await newUser.save()

      // Optionally cache the new user in Redis
      await redis.set(`user:${newUser.id}`, JSON.stringify(newUser), "EX", 3600)

      await kafkaController.sendMessage(
        "user-topic",
        "addUser: " + JSON.stringify(newUser)
      )

      return newUser
    },
  },
}

export default resolvers
