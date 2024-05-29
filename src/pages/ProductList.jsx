import React from 'react';
import { useQuery, getProducts } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const ProductListPage = () => {
  const { data: products, isLoading, error } = useQuery(getProducts);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {products.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id} className='bg-white p-4 mb-4 rounded-lg'>
          <h2 className='text-xl font-bold'>{product.name}</h2>
          <p className='text-gray-500'>Price: ${product.price}</p>
          <p>{product.description}</p>
        </Link>
      ))}
    </div>
  );
}

export default ProductListPage;