import React, { useState, useEffect } from "react";

const CartModal = ({ isOpen, onClose, cartItems, onRemove }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [quantities, setQuantities] = useState({});

    // Initialize or reset quantities when cart updates
    useEffect(() => {
        const initialQuantities = {};
        cartItems.forEach((item) => {
            initialQuantities[item.id] = quantities[item.id] || 1;
        });
        setQuantities(initialQuantities);
    }, [cartItems]);

    const handleCheckboxChange = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        );
    };

    const handleQuantityChange = (id, delta) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(1, prev[id] + delta),
        }));
    };

    const handleBuy = () => {
        const itemsToBuy = cartItems.filter((item) => selectedItems.includes(item.id));
        if (itemsToBuy.length === 0) {
            alert("Please select items to buy.");
            return;
        }

        const total = itemsToBuy.reduce(
            (sum, item) => sum + item.price * (quantities[item.id] || 1),
            0
        );

        alert(`✅ Purchase successful!\n🧾 Total: $${total.toFixed(2)}`);

        // Remove purchased items
        itemsToBuy.forEach((item) => onRemove(item.id));
        setSelectedItems([]);
    };

    const handleRemove = () => {
        selectedItems.forEach(onRemove);
        setSelectedItems([]);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-2xl p-6 w-full max-w-2xl overflow-y-auto max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">🛒 Your Cart</h2>

                {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-center">Your cart is empty.</p>
                ) : (
                    <ul className="space-y-6">
                        {cartItems.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center gap-4 border-b pb-4"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.id)}
                                    onChange={() => handleCheckboxChange(item.id)}
                                    className="w-5 h-5 mt-2"
                                />
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-16 h-16 object-contain"
                                />
                                <div className="flex flex-col flex-grow">
                                    <span className="font-medium text-sm line-clamp-2">
                                        {item.title}
                                    </span>
                                    <span className="text-green-600 font-bold mt-1">
                                        ₹{item.price}
                                    </span>
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, -1)}
                                            className="bg-gray-300 hover:bg-gray-400 px-2 rounded text-sm"
                                        >
                                            -
                                        </button>
                                        <span className="mx-2 text-sm">{quantities[item.id]}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, 1)}
                                            className="bg-gray-300 hover:bg-gray-400 px-2 rounded text-sm"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {cartItems.length > 0 && (
                    <div className="mt-6 flex justify-between gap-4">
                        <button
                            onClick={handleBuy}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
                        >
                            Buy
                        </button>
                        <button
                            onClick={handleRemove}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
                        >
                            Remove
                        </button>
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default CartModal;






