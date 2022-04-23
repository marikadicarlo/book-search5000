const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user_id })
          .select("-__v -password")
          .populate("books");

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    addUser: async (parent, args, context) => {},
    login: async (parent, args, context) => {},
    saveBook: async (parent, args, context) => {},
    removeBook: async (parent, args, context) => {},
  },
};

module.exports = resolvers;
