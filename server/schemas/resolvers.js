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
    addUser: async (parent, args, context) => {
        const user = await User.create(args);
        const token = signToken(user);
        
        return { token, user };
    },

    login: async (parent, args, context) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new AuthenticationError('Incorrect Credentials');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            throw new AuthenticationError('Incorrect Credentials');
        }

        const token = signToken(user);
        
        return { token, user };
    },

    saveBook: async (parent, args, context) => {
        if (context.user) {
            const updatedUser = await User.findbyIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: args.input } },
                { new: true, runValidators: true }
            );

            return updatedUser;
        }

        throw new AuthenticationError('Please log in!')
    },

    removeBook: async (parent, args, context) => {
        if (context.user) {
            const newUpdateUser = await User.findbyIdAndUpdate(
                { _id: context.user._id },
                { $pull: {savedBooks: { bookId: args.bookId } } },
                { new: true }
            );

            return newUpdateUser;
        }

        throw new AuthenticationError('Please log in!');
    },
  },
};

module.exports = resolvers;
