import "../css/ProductPage.css";
import { useProducts } from "../context/ProductContext";
import { useState } from "react";
import { ProductCredentials } from "../types/product.types";

export const AddProductForm = () => {
    const { addProduct } = useProducts();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Felmeddelanden för varje inputfält
    const [nameError, setNameError] = useState("");
    const [categoryError, setCategoryError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [priceError, setPriceError] = useState("");

    const [product, setProduct] = useState<ProductCredentials>({
        name: "",
        category: "",
        description: "",
        price: 0
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newValue = name === "price" ? Number(value) : value;
        setProduct({ ...product, [name]: newValue });
    };

    // Valideringsfunktion
    const validateForm = () => {
        let isValid = true;

        if (product.name.trim().length < 3) {
            setNameError("Namnet måste vara minst 3 tecken.");
            isValid = false;
        } else {
            setNameError("");
        }

        if (product.category.trim().length < 3) {
            setCategoryError("Kategorin måste vara minst 3 tecken.");
            isValid = false;
        } else {
            setCategoryError("");
        }

        if (product.description.length > 200) {
            setDescriptionError("Beskrivning får max vara 200 tecken.");
            isValid = false;
        } else {
            setDescriptionError("");
        }

        if (product.price <= 0) {
            setPriceError("Priset måste vara ett positivt nummer.");
            isValid = false;
        } else {
            setPriceError("");
        }

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!validateForm()) {
            return;
        }

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
        setNameError("");
        setCategoryError("");
        setDescriptionError("");
        setPriceError("");
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
            {nameError && <p className="error-text">{nameError}</p>}

            <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleInputChange}
                placeholder="Kategori"
                required
            />
            {categoryError && <p className="error-text">{categoryError}</p>}

            <textarea
                name="description"
                value={product.description}
                onChange={handleInputChange}
                placeholder="Beskrivning"
                required
            />
            {descriptionError && <p className="error-text">{descriptionError}</p>}

            <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                placeholder="Pris"
                required
            />
            {priceError && <p className="error-text">{priceError}</p>}

            <div>
                <button className="btn saveBtn" type="submit">Lägg till</button>
                <button className="btn cancelBtn" type="button" onClick={handleCancel}>Avbryt</button>
            </div>
        </form>
    );
};
