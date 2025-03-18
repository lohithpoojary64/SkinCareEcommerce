'use client';
import { createContext, useState, useEffect, useContext } from 'react';

// Create the Context
export const ProductContext = createContext();

// Create a Provider Component
export const ProductProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [flashDeals, setFlashDeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                if (!response.ok) throw new Error('Failed to fetch products');

                const result = await response.json();
                setAllProducts(result.products);

                // Sort by ID to get the latest 5 products for "New Arrivals"
                const sortedProducts = [...result.products].sort((a, b) => b.id - a.id);
                setNewArrivals(sortedProducts.slice(0, 5));

                // Filter products with discount > 10% for "Flash Deals"
                const discountedProducts = result.products
                    .filter((product) => product.discountPercentage > 10)
                    .map((product) => ({
                        ...product,
                        expiry: Date.now() + Math.floor(Math.random() * 3 * 60 * 60 * 1000) + 1 * 60 * 60 * 1000, // 1-3 hours expiry
                    }));

                setFlashDeals(discountedProducts);
                setLoading(false);
            } catch (error) {
                console.error('Error while fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ allProducts, newArrivals, flashDeals, loading }}>
            {children}
        </ProductContext.Provider>
    );
};

// Custom Hook for using ProductContext
export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error('useProducts must be used within a ProductProvider');
    return context;
};
