// graph ql through apollo server
const { gql } = require('apollo-server-express');
// define types of data
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]!
    }
    type Book {
        _id: ID
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
    }
    #use input to store data from API call
    input SavedBookInput {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    # define mutations available
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: SavedBookInput): User
        removeBook(bookId: String!): User
    }


`;

module.exports = typeDefs;
