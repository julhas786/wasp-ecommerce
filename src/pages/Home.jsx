import React from 'react';
import { useQuery, getProducts } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { data: products, isLoading, error } = useQuery(getProducts);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Featured Products</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className='bg-white p-4 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold'>{product.name}</h2>
            <p className='text-gray-600'>{product.description}</p>
            <p className='text-blue-500 font-semibold mt-2'>${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;