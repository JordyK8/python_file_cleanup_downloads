import { default as api } from '../api/graphql-main/main'
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import cors from 'cors';
const PORT = 3000

const app = express();
const httpServer = http.createServer(app);
app.use(cors({origin: "http://localhost", credentials: false}))
const server = new ApolloServer({
  typeDefs: api.mainGraphSchemas,
  resolvers: api.mainGraphResolvers,
  subscriptions: {
    onConnect: () => {
      console.log("Client connected for subscriptions");
    },
    onDisconnect: () => {
      console.log("Client disconnected from subscriptions");
    },
  },
});
server.applyMiddleware({ app });
server.installSubscriptionHandlers(httpServer);
app.listen({ port: PORT }, () =>{
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})
