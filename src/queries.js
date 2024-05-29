import { HttpError } from 'wasp/server';

export const getProduct = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401); }

  const product = await context.entities.Product.findUnique({
    where: { id },
    include: { reviews: true }
  });

  if (!product) throw new HttpError(404, 'No product with id ' + id);

  return product;
};

export const getProducts = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  return context.entities.Product.findMany({
    where: {
      categories: args.categories
    }
  });
};

export const getOrder = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401); }

  const order = await context.entities.Order.findUnique({
    where: { id },
    include: { products: true, user: true }
  });

  if (!order) { throw new HttpError(404, 'No order found with id ' + id); }

  return order;
};

export const getOrders = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  return context.entities.Order.findMany({
    where: { userId: context.user.id }
  });
};

export const getReviews = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  return context.entities.Review.findMany({
    where: {
      productId: args.productId
    }
  });
};
