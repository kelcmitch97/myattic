const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {

    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },

    categories: async () => {
      return await Category.find();
    },

    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Product.find(params).populate('category');
    },

    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },

    users: async () => {
      return await User.find();
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate('products');

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },

    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addProduct: async (parent, args, context) => {
      if (context.user) {

        const product = await Product.create(args.productData);

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { products: product } },
          { new: true }
        );

        return product;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    editProduct: async (parent, args, context) => {

      if (context.user) {

        const product = await Product.findByIdAndUpdate(
          { _id: args.productId },
          { $set: args.productData},
          { new: true}
        );

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id},
          { $set: { products: product } },
          { new: true }
        );

        await updatedUser.save();

      return product;

        // const product = await Product.findByIdAndUpdate(
        //   { _id },
        //   { $set: productData },
        //   { new: true}
        // )

        // return User.findByIdAndUpdate(
        //   { _id },
        //   { $pull: {products: product} },
        //   { new: true}
        // )

      };
    
      throw new AuthenticationError('You need to be logged in!');
    },

    removeProduct: async (parent, args, context) => {
      if (context.user) {

        const product = await Product.findByIdAndDelete(args.productId);

          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id},
            { $pull: { products: { _id: args.productId } } },
            { new: true }
          );

          await updatedUser.save();

        return product
      }
    }  
  }
};

module.exports = resolvers;
