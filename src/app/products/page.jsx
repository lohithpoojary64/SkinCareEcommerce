'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Products = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://dummyjson.com/products?limit=100`);
                const result = await response.json();
                
                setData(result.products);
                setFilteredProducts(result.products.slice(0, 20));
                
                const uniqueCategories = ['All', ...new Set(result.products.map(p => p.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.log('Error while fetching data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!observerRef.current) return;
        
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loading && selectedCategory === 'All') {
                setPage(prevPage => prevPage + 1);
            }
        });

        observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [loading, selectedCategory]);

    useEffect(() => {
        if (page > 1 && selectedCategory === 'All') {
            setLoading(true);
            setTimeout(() => {
                setFilteredProducts(prevProducts => [...prevProducts, ...data.slice(prevProducts.length, prevProducts.length + 20)]);
                setLoading(false);
            }, 1000);
        }
    }, [page, selectedCategory]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setPage(1);
        if (category === 'All') {
            setFilteredProducts(data.slice(0, 20));
        } else {
            setFilteredProducts(data.filter(product => product.category === category));
        }
    };

    return (
        <div className="p-4">
            <button onClick={() => router.push('/')} className="mb-4 px-4 py-2 bg-gray-300 rounded-md">Back</button>
            
            <div className="flex gap-4 overflow-x-auto p-2 mb-4 custom-scrollbar">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleCategoryClick(category)}
                        className={`px-4 py-2 rounded-md font-semibold transition cursor-pointer ${
                            selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="relative flex flex-wrap justify-center md:justify-start gap-4 p-4 border rounded-2xl custom-scrollbar">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Link href={`/products/${product.id}`} key={product.id}>
                            <div className="w-[160px] md:w-[230px] p-3 md:p-4 border rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition">
                                <div className="w-full h-[150px] md:h-[200px] relative">
                                    <Image
                                        src={product.images?.[0] || '/fallback-image.png'}
                                        layout="fill"
                                        objectFit="contain"
                                        alt={product.title}
                                        className="rounded-lg"
                                    />
                                </div>
                                <div className="mt-3 md:mt-4">
                                    <h2 className="text-sm md:text-lg font-bold">{product.title}</h2>
                                    <p className="text-xs md:text-sm text-gray-500">{product.brand}</p>
                                    <p className="text-sm md:text-md font-semibold text-green-600">${product.price}</p>
                                    <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                                    <p className="text-xs text-gray-500">Category: {product.category}</p>
                                    <p className="text-xs text-gray-500">Rating: ⭐{product.rating}</p>
                                    <p className="text-xs text-gray-500">Discount: {product.discountPercentage}%</p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No products found for this category.</p>
                )}
                <div ref={observerRef} className="w-full text-center py-4">
                    {loading && <p>Loading more products...</p>}
                </div>
            </div>
        </div>
    );
};

export default Products;
