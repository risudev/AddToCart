import React, { useEffect, useState } from 'react';
import Navbar from "./Components/Navbar"
import ProductList from './Components/ProductList';
import CartModal from './Components/CartModal';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(setProducts)
      .catch((err) => console.log("Failed to fetch products", err));
  }, []);

  const handleAddToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      alert("Item already added to the card");
    } else {
      setCart([...cart, { ...product, quantity: 1, selected: false }]);
    }
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  
  const handleToggleSelect = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleIncreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  
  const handleDecreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div>
      <Navbar cartCount={cart.length} onCartClick={() => setIsModalOpen(true)} />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8">Shop Our Products</h1>
      </div>
      <ProductList products={products} onAddToCart={handleAddToCart} />
      <CartModal isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cartItems={cart}
        onRemove={handleRemoveFromCart}
        onToggleSelect={handleToggleSelect}
        onIncrease={handleIncreaseQuantity}
        onDecrease={handleDecreaseQuantity} />
    </div>
  );
};

export default App;