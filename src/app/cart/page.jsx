'use client';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const router = useRouter();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart.map(item => ({ ...item, quantity: item.quantity || 1 })));
    }, []);

    const updateLocalStorage = useCallback((updatedCart) => {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }, []);

    const removeFromCart = (id) => {
        const updatedCart = cart.filter(product => product.id !== id);
        setCart(updatedCart);
        updateLocalStorage(updatedCart);
        toast.error('Item removed from cart!');
    };

    const updateQuantity = (id, quantity) => {
        const updatedCart = cart.map(product => 
            product.id === id ? { ...product, quantity: Math.max(1, quantity) } : product
        );
        setCart(updatedCart);
        updateLocalStorage(updatedCart);
        toast.info('Quantity updated!');
    };

    return (
        <div className="p-4">
            <button 
                onClick={() => router.push('/')} 
                className="mb-4 px-4 py-2 bg-gray-400 rounded-md hover:bg-gray-500 transition"
                aria-label="Go Back"
            >Back</button>
            <h1 className="text-2xl font-bold mb-4 text-gray-300">Shopping Cart 🛒</h1>
            {cart.length > 0 ? (
                <div className="grid gap-4">
                    {cart.map((product) => (
                        <div key={product.id} className="flex items-center gap-4 border p-4 rounded-lg shadow-md bg-gray-800">
                            <div className="w-15 lg:w-24 h-24 relative">
                                <Image
                                    src={product.images?.[0] || '/fallback-image.png'}
                                    layout="fill"
                                    objectFit="contain"
                                    alt={product.title}
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold text-gray-300">{product.title}</h2>
                                <p className="text-gray-400">Price: ${product.price}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <button 
                                        onClick={() => updateQuantity(product.id, product.quantity - 1)}
                                        className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition"
                                        aria-label="Decrease quantity"
                                    >-</button>
                                    <span className="px-4 py-1 bg-gray-700 text-white rounded-md">{product.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(product.id, product.quantity + 1)}
                                        className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition"
                                        aria-label="Increase quantity"
                                    >+</button>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFromCart(product.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                aria-label="Remove item"
                            >
                                Remove ❌
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400">Your cart is empty. 🛍️</p>
            )}
        </div>
    );
};

export default Cart;
