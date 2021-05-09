import { gql } from "apollo-server-core";

export const resolvers = {
	Query: {
		hello: () => 'Hello World!',
	}
};

export const typeDefs = gql`
	type Query { 
		hello: String!
	}
`;
