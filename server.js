require("dotenv").config();
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startApolloServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({ req, res }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    },
  });
  console.log(`🚀  Server ready at: ${url}`);
}

startApolloServer();
