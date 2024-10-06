import redis from "./db/redisClient"
import Product from "./models/Product"

const resolvers = {
  Query: {
    async getAllProducts() {
      // Fetch all products from the MongoDB collection
      return await Product.find({})
    },
    async getProduct(_: any, { id }: { id: string }) {
      // Check if the product is in Redis cache
      const cachedProduct = await redis.get(`product:${id}`)
      if (cachedProduct) {
        return JSON.parse(cachedProduct)
      }

      // If not in Redis, fetch from MongoDB
      const product = await Product.findById(id)
      if (product) {
        // Cache the result in Redis for future requests
        await redis.set(`product:${id}`, JSON.stringify(product), "EX", 3600) // Cache for 1 hour
      }

      return product
    },
  },
  Mutation: {
    async addProduct(_: any, { name, age }: { name: string; age: number }) {
      // Create a new product
      const newProduct = new Product({ name, age })
      await newProduct.save()

      // Optionally cache the new product in Redis
      await redis.set(
        `product:${newProduct.id}`,
        JSON.stringify(newProduct),
        "EX",
        3600
      )

      return newProduct
    },
  },
}

export default resolvers
