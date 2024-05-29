import React from 'react';
import { useQuery, getOrder } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const { data: order, isLoading, error } = useQuery(getOrder);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Order Confirmation</h1>
      <p>Order ID: {order.id}</p>
      <p>Total: ${order.total}</p>
      <p>Status: {order.status}</p>
      <h2 className='text-xl font-bold mt-4'>Products:</h2>
      <ul>
        {order.products.map(product => (
          <li key={product.id} className='border rounded p-2 mt-2'>
            <p>{product.name}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderConfirmationPage;