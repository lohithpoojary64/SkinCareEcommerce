'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Products = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://dummyjson.com/products?limit=100`);
                const result = await response.json();
                
                setData(result.products);
                setFilteredProducts(result.products);
                
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
            if (entries[0].isIntersecting && !loading) {
                setPage(prevPage => prevPage + 1);
            }
        });

        observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [loading]);

    useEffect(() => {
        if (page > 1) {
            setLoading(true);
            setTimeout(() => {
                setFilteredProducts(prevProducts => [...prevProducts, ...data.slice(prevProducts.length, prevProducts.length + 20)]);
                setLoading(false);
            }, 1000);
        }
    }, [page]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        if (category === 'All') {
            setFilteredProducts(data.slice(0, 20));
        } else {
            setFilteredProducts(data.filter(product => product.category === category));
        }
    };

    return (
        <div className="p-4">
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

            <div className="relative flex flex-wrap justify-center gap-4 p-4 border rounded-2xl custom-scrollbar">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <Link href={`/products/${product.id}`} key={product.id}>
                            <div className="w-[230px] p-4 border rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition">
                                <div className="w-full h-[200px] relative">
                                    <Image
                                        src={product.images?.[0] || '/fallback-image.png'}
                                        layout="fill"
                                        objectFit="contain"
                                        alt={product.title}
                                        className="rounded-lg"
                                    />
                                </div>
                                <div className="mt-4">
                                    <h2 className="text-lg font-bold">{product.title}</h2>
                                    <p className="text-sm text-gray-500">{product.brand}</p>
                                    <p className="text-md font-semibold text-green-600">${product.price}</p>
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
