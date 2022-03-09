import {gql, ApolloServer} from "apollo-server-lambda";

const IS_LOCAL = !!process.env.IS_LOCAL;

const typeDefs = gql`
	type Query {
		hello: String
		getMe: User!
	}
	type Mutation {
		createUser(input: CreateUserInput!): User!
	}
	input CreateUserInput {
		name: String!
		email: String!
	}
	type User {
		id: String!
		email: String!
		name: String!
	}
`;

const resolvers = {
	Query: {
		hello: () => "Hello, New World!, Shadab, Nishat",
		getMe: () => ({
			id: "123",
			email: "shadabsaharsa@gmail.com",
			name: "Shadab",
		}),
	},
	Mutation: {
		createUser: (parent: any, {input}: any, user: any) => {
			console.log(input, user);
			return {
				id: "123",
				email: "shadabsaharsa@gmail.com",
				name: "Shadab",
			};
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	playground: IS_LOCAL,
	introspection: IS_LOCAL,
});

export const handler = server.createHandler();
