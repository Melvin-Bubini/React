import { Product, ProductCredentials } from "../types/product.types";

const apiRequest = async (url: string, method: string, body?: any) => {
    try {
        const options: RequestInit = {
            method,
            headers: { "Content-Type": "application/json"},
            body: body ? JSON.stringify(body) : undefined
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Fel vid ${method} förfrågan. Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Ett fel uppstod vid ${method}:`, error);
        throw error;
    }
};

export const getProducts = () => apiRequest("http://localhost:4000/products", "GET");
export const getProductById = (id: number) => apiRequest(`http://localhost:4000/products/${id}`, "GET");
export const createProduct = (product: ProductCredentials) => apiRequest("http://localhost:4000/products", "POST", product);
export const updateProduct = (product: Product) => apiRequest(`http://localhost:4000/products/${product.id}`, "PUT", product);
export const deleteProduct = (id: number) => apiRequest(`http://localhost:4000/products/${id}`, "DELETE");
