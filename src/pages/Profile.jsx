import React from 'react';
import { useQuery, getOrders } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { data: orders, isLoading, error } = useQuery(getOrders);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {orders.map((order) => (
        <div key={order.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>Total: {order.total}</div>
          <div>Status: {order.status}</div>
          <div>Products: {order.products.map((product) => (
            <div key={product.id}>{product.name} - Quantity: {product.quantity}</div>
          ))}</div>
        </div>
      ))}
    </div>
  );
}

export default ProfilePage;