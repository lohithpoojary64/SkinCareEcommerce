'use client';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../Context/ProductContext';
import Image from 'next/image';

const FlashDeals = () => {
    const { flashDeals, loading } = useContext(ProductContext);
    const [timers, setTimers] = useState({});

    // 🔥 Update countdown timers
    useEffect(() => {
        const interval = setInterval(() => {
            const updatedTimers = {};
            flashDeals.forEach((product) => {
                const remainingTime = product.expiry - Date.now();
                if (remainingTime > 0) {
                    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
                    const seconds = Math.floor((remainingTime / 1000) % 60);
                    updatedTimers[product.id] = { hours, minutes, seconds };
                } else {
                    updatedTimers[product.id] = { hours: 0, minutes: 0, seconds: 0 };
                }
            });
            setTimers(updatedTimers);
        }, 1000);

        return () => clearInterval(interval);
    }, [flashDeals]);

    if (loading) return <p className="text-center text-gray-500">Loading Flash Deals...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">🔥 Flash Deals</h2>
            <div className="flex flex-wrap gap-4 justify-center overflow-x-auto hide-scrollbar">
                {flashDeals.map((product) => (
                    <div key={product.id} className="w-[230px] p-4 border rounded-lg shadow-lg relative">
                        {/* Countdown Timer */}
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-lg">
                            ⏳ {timers[product.id]?.hours}h {timers[product.id]?.minutes}m {timers[product.id]?.seconds}s
                        </div>

                        {/* Product Image */}
                        <div className="w-full h-[150px] relative">
                            <Image
                                src={product.images?.[0] || '/fallback-image.png'}
                                layout="fill"
                                objectFit="contain"
                                alt={product.title}
                                className="rounded-lg"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="mt-3">
                            <h3 className="text-md font-bold">{product.title}</h3>
                            <p className="text-sm text-gray-500">{product.brand}</p>
                            <p className="text-md font-semibold text-green-600">
                                ${product.price} <span className="text-red-500 line-through">${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</span>
                            </p>
                            <p className="text-xs text-gray-500">Discount: {product.discountPercentage}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlashDeals;
