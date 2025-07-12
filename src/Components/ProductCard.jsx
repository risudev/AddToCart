import React from 'react';

const ProductCard = ({product, onAddToCart}) => {
    return (
        <div className='border rounded-xl p-4 shadow-md bg-white hover:shadow-lg transition-all flex flex-col justify-between'>
            <img
                src={product.image}
                alt={product.title}
            className='h-48 object-contain mb-4 mx-auto'/>
            <h2 className='text-lg font-semibold mb-2 text-center line-clamp-2'>{product.title}</h2>
            <p className='text-green-600 font-bold mb-4 text-center'>₹{product.price}</p>
            <button onClick={() => onAddToCart(product)}
            className='mt-auto bg-indigo-500 text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:bg-indigo-700 hover-scale-105'>Add to Cart</button>
        </div>
    );
};

export default ProductCard;