import { HttpError } from 'wasp/server'

export const createOrder = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const total = calculateTotal(args.products);
  const newOrder = await context.entities.Order.create({
    data: {
      total,
      status: 'pending',
      products: {
        create: args.products.map(product => ({
          quantity: product.quantity,
          product: { connect: { id: product.productId } }
        }))
      },
      user: { connect: { id: context.user.id } }
    }
  });
  return newOrder;
};

export const addToCart = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.ProductOrder.create({
    data: {
      product: { connect: { id: args.productId } },
      order: { connect: { userId: context.user.id } },
      quantity: args.quantity
    }
  });
}

export const removeFromCart = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const product = await context.entities.Product.findUnique({
    where: { id: args.productId }
  });
  const user = await context.entities.User.findUnique({
    where: { id: context.user.id }
  });
  // Implement the logic to remove the product from the cart
}

export const updateOrder = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const order = await context.entities.Order.findUnique({
    where: { id: args.id }
  });
  if (order.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Order.update({
    where: { id: args.id },
    data: { total: args.total, status: args.status }
  });
}

export const createReview = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Review.create({
    data: {
      rating: args.rating,
      comment: args.comment,
      productId: args.productId
    }
  });
}