// require models, authentication and signtoken
const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

// resolvers needed
 // get single user
 // create user
 // login
 // save book
 // delete book

const resolvers = {
    Query: {
        me: async (parent, { username }) => {
            return User.findOne({ username }).populate('savedBooks');
          },
    }



};

module.exports = resolvers;
