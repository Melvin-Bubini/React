import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import "../css/ProductPage.css";
import { Product } from "../types/product.types";
import { AddProductForm } from "../components/AddProductForm";

const ProductPage = () => {
  const { products, loading, editProduct, removeProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validera inmatning
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!updatedProduct?.name.trim()) newErrors.name = "Produktnamn är obligatoriskt.";
    if (!updatedProduct?.category.trim()) newErrors.category = "Kategori är obligatorisk.";
    if (!updatedProduct?.description.trim()) newErrors.description = "Beskrivning är obligatorisk.";
    if (!updatedProduct?.price || updatedProduct.price <= 0) newErrors.price = "Priset måste vara större än 0.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hantera inmatningsändringar
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (updatedProduct) {
      setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
    }
  };

  // Hantera uppdatering
  const handleUpdate = async () => {
    if (!validateForm()) return;

    if (updatedProduct) {
      await editProduct(updatedProduct);
      setEditingProduct(null);
      setUpdatedProduct(null);
      setErrors({});
    }
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="product-page">
      <h1 className="title">Produktsidan</h1>
      <button className={showForm ? "btn cancelBtn" : "btn saveBtn"} onClick={toggleForm}>
        {showForm ? "Stäng" : "Lägg till"}
      </button>
      {showForm && <AddProductForm />}
      {loading ? (
        <h3 className="errorMessage">Laddar produkter...</h3>
      ) : !products.length ? (
        <h3 className="errorMessage">Inga produkter finns.</h3>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <p className="description">{product.description}</p>
              <p className="price">{product.price} kr</p>
              <button
                className="btn updateBtn"
                onClick={() => {
                  setEditingProduct(product);
                  setUpdatedProduct({ ...product });
                  setErrors({});
                }}
              >
                Ändra
              </button>
              <button className="btn deleteBtn" onClick={() => removeProduct(product.id)}>
                Radera
              </button>

              {editingProduct?.id === product.id && (
                <div className="edit-form">
                  <input
                    type="text"
                    name="name"
                    value={updatedProduct?.name || ""}
                    onChange={handleChange}
                  />
                  {errors.name && <div className="error-message">{errors.name}</div>}

                  <input
                    type="text"
                    name="category"
                    value={updatedProduct?.category || ""}
                    onChange={handleChange}
                  />
                  {errors.category && <div className="error-message">{errors.category}</div>}

                  <textarea
                    name="description"
                    value={updatedProduct?.description || ""}
                    onChange={handleChange}
                  />
                  {errors.description && <div className="error-message">{errors.description}</div>}

                  <input
                    type="number"
                    name="price"
                    value={updatedProduct?.price || ""}
                    onChange={handleChange}
                  />
                  {errors.price && <div className="error-message">{errors.price}</div>}

                  <div>
                    <button className="btn saveBtn" onClick={handleUpdate}>
                      Spara
                    </button>
                    <button className="btn cancelBtn" onClick={() => setEditingProduct(null)}>
                      Avbryt
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
