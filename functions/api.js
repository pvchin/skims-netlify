const express = require("express");
const bodyParser = require("body-parser");
const graphql = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const expressGraphQL = require("express-graphql");
const serverless = require("serverless-http");
const { query} = require("./schema/query")

const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

const schema = new GraphQLSchema({
  query,
  
});

const app = express();
app.use(bodyParser.json());
app.use(
  "/",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

module.exports.handler = serverless(app);