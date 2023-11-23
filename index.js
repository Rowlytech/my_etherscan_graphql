// Require Apollo Server
const { ApolloServer } = require("apollo-server");

// Require graphql-import to import schema
const { importSchema } = require("graphql-import");

// Require EtherDataSource 
const EtherDataSource = require("./datasource/ethDatasource");

// Import schema
const typeDefs = importSchema("./schema.graphql");

// Configure environment variables  
require("dotenv").config();

// Define resolvers
const resolvers = {
    Query: {
        // etherBalanceByAddress resolver
        etherBalanceByAddress: (root, _args, { dataSources }) =>
            dataSources.ethDataSource.etherBalanceByAddress(),

        // totalSupplyOfEther resolver
        totalSupplyOfEther: (root, _args, { dataSources }) =>
            dataSources.ethDataSource.totalSupplyOfEther(),

        // latestEthereumPrice resolver
        latestEthereumPrice: (root, _args, { dataSources }) =>
            dataSources.ethDataSource.getLatestEthereumPrice(),

        // blockConfirmationTime resolver
        blockConfirmationTime: (root, _args, { dataSources }) =>
            dataSources.ethDataSource.getBlockConfirmationTime(),
    },
};


// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Set timeout to 0
server.timeout = 0;

// Start server and log url
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});

