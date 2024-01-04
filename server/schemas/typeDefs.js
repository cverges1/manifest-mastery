const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    orders: [Order]
  }

  type Category {
    _id: ID
    categoryName: String
    categoryImage: String
  }
  type Product {
    _id: ID
    name: String
    description: String
    categoryID: Category
    image: String
    price: Float
    salePrice: Float
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Checkout {
    session: ID
  }

  type Query {
    categories: [Category]
    category(_id: ID!): Category
    products(categoryID: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(
      firstName: String!,
      lastName: String!,
      email: String!,
      password: String!,
    ): Auth
    addOrder(products: [ID]!): Order
    updateUser(
      firstName: String,
      lastName: String,
      email: String,
      password: String,
    ): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
