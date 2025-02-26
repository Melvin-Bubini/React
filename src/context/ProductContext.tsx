import { useContext, useState, useEffect, createContext, ReactNode } from "react";
import { Product, ProductCredentials } from "../types/product.types";
import { getProducts, createProduct, deleteProduct, updateProduct } from "../services/Product.service";

// Skapa context
export interface ProductContextType {
    products: Product[];
    loading: boolean;
    addProduct: (product: ProductCredentials) => Promise<{ productId: number }>;
    editProduct: (product: Product) => Promise<void>;
    removeProduct: (id: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | null>(null);

// Provider 
interface ProductProviderProps {
    children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let data = await getProducts();
                data = data.sort((a: Product, b: Product) => b.id - a.id);
                setProducts(data);
            } catch (error) {
                console.error("Fel vid hämtning av produkter: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);


    // Crud funktionalitet
    const addProduct = async (product: ProductCredentials): Promise<{ productId: number }> => {
        try {
            const response = await createProduct(product);
            setProducts(prev => [...prev, { ...product, id: response.productId }]);
            return { productId: response.productId };
        } catch (error) {
            console.error("Fel vid skapande av produkt:", error);
            throw new Error("Fel vid skapande av produkt.");
        }
    };

    const editProduct = async (product: Product) => {
        try {
            const response = await updateProduct(product);
            const updatedProduct = response.updatedProduct;
            setProducts(prev => {
                const newProducts = prev.map(p =>
                    p.id === updatedProduct.id ? updatedProduct : p
                );
                return newProducts;
            });
        } catch (error) {
            console.error(`Fel vid updatering av produkt med id:${product.id}. Fel:`, error);
        }
    };

    const removeProduct = async (id: number) => {
        try {
            await deleteProduct(id);
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error(`Fel vid radering av produkt med id:${id}. Fel:`, error);
        }
    };

    return (
        <ProductContext.Provider value={{ products, loading, addProduct, editProduct, removeProduct }} >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProducts måste användas inom en ProductProvider");
    }
    return context;
};