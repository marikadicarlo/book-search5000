// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCounts: Int
    savedBooks: [Book]
  }
  type Book {
    authors: [String]
    description: String
    bookId: ID
    image: String
    link: String
    title: String
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      bookId: ID!,
      authors: [String],
      title: String,
      image: String,
      link: String,
      description: String
    ): User
    removeBook(bookId: ID!): User
  }
  type Auth {
    token: ID!,
    user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;