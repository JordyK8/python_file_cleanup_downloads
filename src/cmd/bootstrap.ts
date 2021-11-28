import { default as api } from '../api/graphql-main/main'
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';

const app = express();

export default() => {

  const apolloSrv = new ApolloServer({
    typeDefs: [api.mainGraphSchemas],
    resolvers: {
      ...api.mainGraphResolvers,
    },
    subscriptions: {
      onConnect: async (connectionParams) => {
        console.log("connected", connectionParams);
      },
    },
    context: async () => {
      console.log('context');
    },
    playground: true,
  });

  apolloSrv.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: 'http://localhost',
    },
  });

  const server = http.createServer(app);
  apolloSrv.installSubscriptionHandlers(server);

  return server;
};