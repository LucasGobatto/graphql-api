import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type Query {
    hello: String!
  }

  type Mutation {
    createUser(data: UserInput!): User!
  }

  input UserInput {
    name: String!
    password: String!
    email: String!
    birthDate: String
    phone: String
    avatar: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    birthDate: String
    phone: String
    avatar: String
  }
`;
