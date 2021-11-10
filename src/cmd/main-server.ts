import { default as app } from "../lib/server";
import { default as api } from '../api/graphql-main/main'
import { graphqlHTTP } from 'express-graphql'

app.use('/graphql', graphqlHTTP({
  schema: api.mainGraphSchemas,
  rootValue: api.mainGraphResolvers,
  graphiql: true,
}));

app.listen(process.env.MAIN_PORT || 3000);
console.log(`Running a GraphQL API server at ${process.env.MAIN_HOST || 'http://localhost'}:${process.env.MAIN_PORT || 3000}/graphql`);