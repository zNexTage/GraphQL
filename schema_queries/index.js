const { ApolloServer, gql } = require('apollo-server');
const {importSchema}= require('graphql-import');
const resolvers = require('./projeto/resolvers')

const server = new ApolloServer({
    typeDefs:importSchema('./projeto/schema/index.graphql'),
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`);
});