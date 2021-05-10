import { UserInput, UserType } from "./schema.types";

export const resolvers = {
  Query: {
    hello: () => "Hello World!",
  },

  Mutation: {
    createUser: (_: any, { data: args }: { data: UserInput }): UserType => {
      const { password, ...user } = args;
      return { id: 1, ...user };
    },
  },
};
