import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useAction, getCart, removeFromCart } from 'wasp/client/operations';

const CartPage = () => {
  const { data: cartItems, isLoading, error } = useQuery(getCart);
  const removeFromCartFn = useAction(removeFromCart);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleRemoveFromCart = (productId) => {
    removeFromCartFn({ productId });
  };

  return (
    <div className='p-4'>
      {cartItems.map((item) => (
        <div key={item.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{item.name}</div>
          <div>{item.quantity}</div>
          <div>
            <button
              onClick={() => handleRemoveFromCart(item.id)}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartPage;