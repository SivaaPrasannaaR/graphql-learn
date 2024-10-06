import { gql } from "apollo-server"

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int!
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User!]!
  }

  type Mutation {
    addUser(name: String!, age: Int!): User!
  }
`

export default typeDefs
