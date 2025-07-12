import React from 'react';

const Navbar = ({cartCount,onCartClick}) => {
    return (
        <nav className='bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md'>
            <h1 className='text-xl font-bold'>🛍️ Fake Store</h1>
            <button onClick={onCartClick} className='relative bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition'>🛒 Cart ({cartCount})</button>
        </nav>
    );
};

export default Navbar;