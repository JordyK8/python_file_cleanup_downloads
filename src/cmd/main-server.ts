import { default as api } from '../api/graphql-main/main'
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

async function startApolloServer(typeDefs:any, resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    subscriptions: {
      onConnect: () => {
        console.log('connected');
        
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  server.installSubscriptionHandlers(httpServer)
  await new Promise<void>(resolve => httpServer.listen({ port: 3000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`);
}

startApolloServer(api.mainGraphSchemas, api.mainGraphResolvers)