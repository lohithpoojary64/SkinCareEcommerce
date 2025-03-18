'use client';
import { useContext } from 'react';
import { ProductContext } from '../../Context/ProductContext.jsx';
import Image from 'next/image';

const NewArrivals = () => {
    const { newArrivals, loading } = useContext(ProductContext);

    if (loading) return <p className="text-center text-gray-500">Loading New Arrivals...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">🆕 New Arrivals</h2>
            <div className="flex gap-4 overflow-x-auto custom-scrollbar">
                {newArrivals.map((product) => (
                    <div key={product.id} className="w-[230px] p-4 border rounded-lg shadow-lg">
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
                            <p className="text-md font-semibold text-green-600">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewArrivals;
