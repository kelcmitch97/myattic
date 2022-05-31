const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
    user: String
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    username: String
    email: String
    orders: [Order]
    products: [Product]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input productData {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    user: String
  }

  input categoryData {
    name: String
  }

  input categoryData {
    name: String
  }

  type Query {
    categories: [Category]
    users: [User]
    me: User
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateProduct(_id: ID!, quantity: Int!): Product
    editProduct(productId: ID!, productData: productData): Product
    login(email: String!, password: String!): Auth
    addProduct(userId: ID!, productData: productData): Product
    removeProduct(productId: ID!): Product
  }
`;

module.exports = typeDefs;
