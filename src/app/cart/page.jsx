'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const removeFromCart = (id) => {
        const updatedCart = cart.filter(product => product.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart 🛒</h1>
            {cart.length > 0 ? (
                <div className="grid gap-4">
                    {cart.map((product) => (
                        <div key={product.id} className="flex items-center gap-4 border p-4 rounded-lg shadow-md">
                            <div className="w-24 h-24 relative">
                                <Image
                                    src={product.images?.[0] || '/fallback-image.png'}
                                    layout="fill"
                                    objectFit="contain"
                                    alt={product.title}
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{product.title}</h2>
                                <p className="text-gray-500">Price: ${product.price}</p>
                            </div>
                            <button 
                                onClick={() => removeFromCart(product.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                            >
                                Remove ❌
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">Your cart is empty. 🛍️</p>
            )}
        </div>
    );
};

export default Cart;
