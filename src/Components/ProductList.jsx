import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({products, onAddToCart}) => {
    return (
        <div className='p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {products.map((product) => (
               <ProductCard key={product.id} product={product} onAddToCart={onAddToCart}/>
           ))} 
        </div>
    );
};

export default ProductList;