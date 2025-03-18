'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Products = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const result = await response.json();
                console.log('Response is', result);
                setData(result.products); 
            } catch (error) {
                console.log('Error while fetching data in Product component', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='relative w-full flex flex-wrap gap-4 p-4'>
            {data.length > 0 ? (
                data.map((product) => (
                    <div key={product.id} className='w-[250px] p-4 border rounded-lg shadow-lg'>
                        {/* Product Image */}
                        <div className='w-full h-[200px] relative'>
                            <Image
                                src={product.images?.[0] || '/fallback-image.png'} // Corrected image access
                                layout='fill'
                                objectFit='contain'
                                alt={product.title}
                                className='rounded-lg'
                            />
                        </div>

                        {/* Product Details */}
                        <div className='mt-4'>
                            <h2 className='text-lg font-bold'>{product.title}</h2>
                            <p className='text-sm text-gray-500'>{product.brand}</p>
                            <p className='text-md font-semibold text-green-600'>${product.price}</p>
                            <p className='text-xs text-gray-500'>Stock: {product.stock} ({product.availabilityStatus})</p>
                            <p className='text-xs text-gray-500'>Category: {product.category}</p>
                            <p className='text-xs text-gray-500'>Rating: ⭐{product.rating}</p>
                            <p className='text-xs text-gray-500'>SKU: {product.sku}</p>
                            <p className='text-xs text-gray-500'>Discount: {product.discountPercentage}%</p>
                            <p className='text-xs text-gray-500'>Min Order: {product.minimumOrderQuantity}</p>
                            <p className='text-xs text-gray-500'>Return Policy: {product.returnPolicy}</p>
                            <p className='text-xs text-gray-500'>Shipping: {product.shippingInformation}</p>
                            <p className='text-xs text-gray-500'>Warranty: {product.warrantyInformation}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading products...</p>
            )}
        </div>
    );
};

export default Products;
