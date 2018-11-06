// const { GraphQLServer } = require('graphql-yoga');
// const Query = require('./resolvers/Query');
// const Mutation = require('./resolvers/Mutation');
// const db = require('./db');

// // Create GrapghQL Yoga DB

// function createServer() {
//     return new GraphQLServer({
//         typeDefs: 'src/schema.graphql',
//         resolvers: {
//             Query,
//             Mutation
//         },
//         resolverValidationOptions: {
//             requireResolversForResolveType: false
//         },
//         context: req => ({ ...req, db }),
//     });
// }

// module.exports = createServer;

const {
    GraphQLServer
} = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');

// Create the GraphQL Yoga Server

function createServer() {
    return new GraphQLServer({
        typeDefs: 'src/schema.graphql',
        resolvers: {
            Mutation,
            Query,
        },
        resolverValidationOptions: {
            requireResolversForResolveType: false,
        },
        context: req => ({ req,
            db
        }),
    });
}

module.exports = createServer;