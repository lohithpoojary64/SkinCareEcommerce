'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, Select } from 'antd';

const { Option } = Select;

const Products = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const result = await response.json();

                setData(result.products);
                setFilteredProducts(result.products);

                const uniqueCategories = ['All', ...new Set(result.products.map(p => p.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.log('Error while fetching data', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // md breakpoint
        };

        handleResize(); // Run on mount
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle category selection
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === 'All') {
            setFilteredProducts(data);
        } else {
            setFilteredProducts(data.filter(product => product.category === category));
        }
    };

    return (
        <div className="p-4">
            {/* Category Filters - Dropdown for Mobile, Buttons for Desktop */}
            <div className="mb-4">
                {isMobile ? (
                    <Select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="w-full"
                    >
                        {categories.map((category, index) => (
                            <Option key={index} value={category}>
                                {category}
                            </Option>
                        ))}
                    </Select>
                ) : (
                    <div className="flex gap-4 overflow-x-auto lg:p-2 custom-scrollbar">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => handleCategoryChange(category)}
                                className={`px-4 py-2 rounded-md font-semibold transition cursor-pointer ${
                                    selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Products - Grid for Large Screens & Controlled Carousel for Mobile */}
            {isMobile ? (
                <div className="relative">
                    <Carousel
                        dots={false}
                        arrows = {true}
                        autoplay
                        className="w-[260px] mx-auto overflow-hidden" // Adjust width
                    >
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="flex justify-center">
                                <Link href={`/products/${product.id}`}>
                                    <div className="w-[250px] p-3 border rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition">
                                        <div className="w-full h-[180px] relative"> {/* Reduced height */}
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
            ) : (
                <div className="relative h-[700px] overflow-y-auto flex flex-wrap justify-center gap-4 p-4 border rounded-2xl custom-scrollbar">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
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
                </div>
            )}
        </div>
    );
};

export default Products;
