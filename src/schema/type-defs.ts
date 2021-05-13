import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  input LoginInput {
    email: String!
    password: String!
  }

  input CreateUserInput {
    name: String!
    password: String!
    email: String!
    phone: String
  }

  input UserInput {
    id: ID!
  }

  input UsersInput {
    limit: Int = 10
    offset: Int = 0
  }

  type LoginType {
    token: String!
    user: User
  }

  type UserType {
    id: ID!
    name: String!
    email: String!
    phone: String
  }

  type Query {
    user(data: UserInput!): UserType!
    users(data: UsersInput!): [UserType!]
  }

  type Mutation {
    login(data: LoginInput!): LoginType!
    createUser(data: CreateUserInput!): UserType!
  }
`;
