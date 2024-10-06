import { ApolloServer } from "apollo-server"
import { buildSubgraphSchema } from "@apollo/subgraph"
import typeDefs from "./schema"
import resolvers from "./resolvers"
import { connectMongoDB } from "./db/mongoDB"
import dotenv from "dotenv"
import kafkaController from "./db/kafka"

dotenv.config()

// Set up Apollo Server
const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
})

server
  .listen({ port: 4001 })
  .then(({ url }) => {
    console.log(`User service running at ${url}`)
  })
  .then(async () => {
    connectMongoDB()

    // Connect the producer and consumer
    await kafkaController.connectProducer()
    await kafkaController.connectConsumer()

    // Consume messages from the topic
    await kafkaController.consumeMessages("user-topic", (message) => {
      console.log("Processed message:", message)
    })

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await kafkaController.disconnectProducer()
      await kafkaController.disconnectConsumer()
      process.exit()
    })
  })
