import { ApolloServer } from "apollo-server"
import { ApolloGateway } from "@apollo/gateway"

const gateway = new ApolloGateway({
  serviceList: [
    { name: "user-service", url: "http://user-service:4001/graphql" },
    { name: "product-service", url: "http://product-service:4002/graphql" },
  ],
})

const server = new ApolloServer({
  gateway,
  // subscriptions: false,
  context: ({ req }) => {
    console.log(`Incoming request: ${req.body.query}`)
  },
})

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Gateway running at ${url}`)
})
