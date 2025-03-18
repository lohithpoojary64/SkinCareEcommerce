'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ProductDetails = ({ params }) => {
    const router = useRouter();
    const { id } = params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                const result = await response.json();
                setProduct(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    const addToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = [...existingCart, product];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        alert(`${product.title} added to cart!`);
    };


    if (loading) return <p className="text-center text-gray-500">Loading product details...</p>;

    if (!product) return <p className="text-center text-red-500">Product not found.</p>;

    return (
        <div className="p-4">
            <button onClick={() => router.back()} className="mb-4 text-blue-600 underline">
                ← Back to Products
            </button>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Product Image */}
                <div className="w-full md:w-1/2 relative h-[400px]">
                    <Image
                        src={product.images?.[0] || '/fallback-image.png'}
                        layout="fill"
                        objectFit="contain"
                        alt={product.title}
                        className="rounded-lg"
                    />
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-bold">{product.title}</h1>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                    <p className="text-xl font-semibold text-green-600">${product.price}</p>
                    <p className="text-md text-gray-700">{product.description}</p>
                    <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                    <p className="text-xs text-gray-500">Category: {product.category}</p>
                    <p className="text-xs text-gray-500">Rating: ⭐{product.rating}</p>
                    <p className="text-xs text-gray-500">Discount: {product.discountPercentage}%</p>

                    {/* Add to Cart Button */}
                    <Link href="/cart">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md">
                            View Cart 🛒
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
