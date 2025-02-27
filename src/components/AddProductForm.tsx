import "../css/ProductPage.css";
import { useProducts } from "../context/ProductContext";
import { useState } from "react";
import { ProductCredentials } from "../types/product.types";

export const AddProductForm = () => {
    const { addProduct } = useProducts();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [product, setProduct] = useState<ProductCredentials>({
        name: "",
        category: "",
        description: "",
        price: 0
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.name === "price" ? Number(e.target.value) : e.target.value;
        setProduct({ ...product, [e.target.name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await addProduct(product);
            setSuccess(`Ny produkt skapad! Produkt-ID: ${response.productId}`);
            setProduct({
                name: "",
                category: "",
                description: "",
                price: 0
            });
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ett okänt fel uppstod när formuläret skickades.");
            }
        }
    };

    const handleCancel = () => {
        setProduct({
            name: "",
            category: "",
            description: "",
            price: 0
        });
        setError("");
        setSuccess("");
    };

    return (
        <form className="edit-form" onSubmit={handleSubmit}>
            {error && <div className="errorMessage">{error}</div>}
            {success && <div className="successMessage">{success}</div>}
            <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                placeholder="Produktnamn"
                required
            />
            <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleInputChange}
                placeholder="Kategori"
                required
            />
            <textarea
                name="description"
                value={product.description}
                onChange={handleInputChange}
                placeholder="Beskrivning"
                required
            />
            <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                placeholder="Pris"
                required
            />
            <div>
                <button className="btn saveBtn" type="submit">Lägg till</button>
                <button className="btn cancelBtn" type="button" onClick={handleCancel}>Avbryt</button>
            </div>

        </form>
    );
};
