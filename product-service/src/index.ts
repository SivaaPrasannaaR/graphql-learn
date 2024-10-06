import { ApolloServer } from "apollo-server"
import { buildSubgraphSchema } from "@apollo/subgraph"
import typeDefs from "./schema"
import resolvers from "./resolvers"
import { connectMongoDB } from "./db/mongoDB"
import { config } from "dotenv"

config()

connectMongoDB()

// Set up Apollo Server
const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
})

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`User service running at ${url}`)
})
