'use client';
import { useContext } from 'react';
import { ProductContext } from '../../Context/ProductContext.jsx';
import Image from 'next/image';
import { Carousel } from 'antd';
import Link from 'next/link';

const NewArrivals = () => {
    const { newArrivals, loading } = useContext(ProductContext);

    if (loading) return <p className="text-center text-gray-500">Loading New Arrivals...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-300">🆕 New Arrivals</h2>

            {/* Desktop View: Grid Layout */}
            <div className="hidden md:flex gap-4 justify-center overflow-x-auto custom-scrollbar">
                {newArrivals.map((product) => (
                    <div key={product.id} className="w-[230px] lg:p-4 border rounded-lg shadow-lg">
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

            {/* Mobile View: Carousel */}
            <div className="block md:hidden">
                <Carousel dots={false} arrows autoplay className="w-[260px] mx-auto overflow-hidden">
                    {newArrivals.map((product) => (
                        <div key={product.id} className="flex justify-center">
                            <Link href={`/products/${product.id}`}>
                                <div className="w-[250px] p-3 border rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition">
                                    <div className="w-full h-[180px] relative"> {/* Adjusted height */}
                                        <Image
                                            src={product.images?.[0] || '/fallback-image.png'}
                                            layout="fill"
                                            objectFit="contain"
                                            alt={product.title}
                                            className="rounded-lg"
                                        />
                                    </div>
                                    <div className="mt-3 text-center">
                                        <h2 className="text-lg font-bold">{product.title}</h2>
                                        <p className="text-sm text-gray-500">{product.brand}</p>
                                        <p className="text-md font-semibold text-green-600">${product.price}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default NewArrivals;
