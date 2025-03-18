'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { use } from 'react';

const ProductDetails = ({ params }) => {
    const router = useRouter();
    const { id } = use(params); // Unwrap params using React's use()

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

    // Fetch Product Details
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

    // Load Cart from Local Storage on Mount
    useEffect(() => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(existingCart);
    }, []);

    // Add to Cart Function
    const addToCart = (product) => {
        let storedCart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProduct = storedCart.find(item => item.id === product.id);

        if (existingProduct) {
            storedCart = storedCart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            toast.info(`${product.title} quantity updated in cart!`);
        } else {
            const sanitizedProduct = {
                id: product.id,
                title: product.title,
                price: product.price,
                images: product.images,
                quantity: 1
            };
            storedCart.push(sanitizedProduct);
            toast.success(`${product.title} added to cart!`);
        }

        localStorage.setItem('cart', JSON.stringify(storedCart));
        setCart(storedCart); // Update state to reflect changes immediately
    };

    if (loading) return <p className="text-center text-gray-500">Loading product details...</p>;
    if (!product) return <p className="text-center text-red-500">Product not found.</p>;

    return (
        <div className="p-4">
            <button onClick={() => router.back()} className="mb-4 text-gray-400 underline">
                ← Back to Products
            </button>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 relative h-[400px]">
                    <Image
                        src={product.images?.[0] || '/fallback-image.png'}
                        layout="fill"
                        objectFit="contain"
                        alt={product.title || 'Product image'}
                        className="rounded-lg"
                    />
                </div>

                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-bold text-gray-300">{product.title}</h1>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                    <p className="text-xl font-semibold text-green-600">${product.price}</p>
                    <p className="text-md text-gray-700">{product.description}</p>
                    <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                    <p className="text-xs text-gray-500">Category: {product.category}</p>
                    <p className="text-xs text-gray-500">Rating: ⭐{product.rating}</p>
                    <p className="text-xs text-gray-500">Discount: {product.discountPercentage}%</p>

                    <button 
                        onClick={() => addToCart(product)} 
                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md font-bold hover:bg-blue-700 transition"
                    >
                        Add to Cart 🛒
                    </button>

                    <Link href="/cart">
                        <button className="mt-4 ml-4 bg-green-600 text-white px-4 py-2 rounded-md font-bold hover:bg-green-700 transition">
                            View Cart 🛒 ({cart.reduce((total, item) => total + item.quantity, 0)})
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
