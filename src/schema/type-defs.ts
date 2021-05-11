import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type Query {
    hello: String!
  }

  type Mutation {
    login(data: LoginInput!): LoginType!
    createUser(data: UserInput!): User!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UserInput {
    name: String!
    password: String!
    email: String!
    birthDate: String
    phone: String
    avatar: String
  }

  type LoginType {
    token: String!
    user: User
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
