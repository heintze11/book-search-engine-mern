// require models, authentication and signtoken
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

// resolvers needed
 // get single user aka query me
 // create user
 // login
 // save book
 // delete book

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password');
      
                return userData;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },
        
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError("Login credentials don't match");
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError("Login credentials don't match");
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
        
        saveBook: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                  { _id: context.user._id },
                  { $addToSet: { savedBooks: args } },
                  { new: true, runValidators: true }
                );
            }  
            throw new AuthenticationError('You need to be logged in!');
            },
        
        removeBook: async (parent, { userId, bookId }, context) => {
            if (context.user) {
              return User.findOneAndUpdate(
                { _id: userId },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
              );
            }
            throw new AuthenticationError('You need to be logged in!');
          },

    },
};

module.exports = resolvers;
