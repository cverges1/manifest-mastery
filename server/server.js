// Importing our dependencies and all middleware
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
require('dotenv').config();

// Importing our typeDefs and resolvers
// Establishing our db connection
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// Here we state the local host PORT we will be using
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  debug: true,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// When production is ran, app will be sent to the ../client/build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  });
});

// This will initialize our Apollo Server and  apply the middleware
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Initiate the Apollo Server with the typeDefs and Resolvers as parameters
startApolloServer(typeDefs, resolvers);
