'use client';
import { createContext, useState, useEffect, useContext } from 'react';

// Create the Context
export const ProductContext = createContext();

// Create a Provider Component
export const ProductProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const result = await response.json();
                setAllProducts(result.products);

                // Sort by ID to get the latest 5 products for "New Arrivals"
                const sortedProducts = [...result.products].sort((a, b) => b.id - a.id);
                setNewArrivals(sortedProducts.slice(0, 5));

                setLoading(false);
            } catch (error) {
                console.error('Error while fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ allProducts, newArrivals, loading }}>
            {children}
        </ProductContext.Provider>
    );
};

// Custom hook for using the context
export const useProducts = () => useContext(ProductContext);
