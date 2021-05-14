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
    user: UserType
  }

  type UserType {
    id: ID!
    name: String!
    email: String!
    phone: String
  }

  type UsersType {
    hasNextPage: Boolean!
    hasPreviusPage: Boolean!
    count: Int!
    users: [UserType]!
  }

  type Query {
    getOneUser(data: UserInput!): UserType!
    getManyUsers(data: UsersInput!): UsersType!
  }

  type Mutation {
    login(data: LoginInput!): LoginType!
    createUser(data: CreateUserInput!): UserType!
  }
`;
