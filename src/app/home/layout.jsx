import { ProductProvider } from '../Context/ProductContext.jsx';

export default function RootLayout({ children }) {
    return (
        <ProductProvider>
            {children}
        </ProductProvider>
    );
}
