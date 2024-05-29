import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useAction, getProduct, getReviews, createReview } from 'wasp/client/operations';

const ProductDetailsPage = ({ match }) => {
  const productId = match.params.productId;
  const { data: product, isLoading: productLoading, error: productError } = useQuery(getProduct, { id: productId });
  const { data: reviews, isLoading: reviewsLoading, error: reviewsError } = useQuery(getReviews, { productId });
  const createReviewFn = useAction(createReview);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const handleCreateReview = () => {
    createReviewFn({ ...newReview, productId });
    setNewReview({ rating: 5, comment: '' });
  };

  if (productLoading || reviewsLoading) return 'Loading...';
  if (productError || reviewsError) return 'Error: ' + (productError || reviewsError);

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold'>{product.name}</h1>
      <p className='text-lg mb-4'>{product.description}</p>
      <div className='mb-4'>
        <h2 className='text-xl font-bold mb-2'>Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id} className='border p-2 mb-2'>
            <p><strong>Rating:</strong> {review.rating}</p>
            <p><strong>Comment:</strong> {review.comment}</p>
          </div>
        ))}
        <h2 className='text-xl font-bold mb-2'>Add a Review</h2>
        <input type='number' value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })} className='border p-2 mb-2' />
        <textarea value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} className='border p-2 mb-2'></textarea>
        <button onClick={handleCreateReview} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Submit Review</button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;