import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import "../css/ProductPage.css";
import { Product } from "../types/product.types";

const ProductPage = () => {
  const { products, loading, editProduct, removeProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null);
  
  // Flytta dessa renderingsvillkor till själva render-metoden

  // formulärändringar
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (updatedProduct) {
      setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async () => {
    if (updatedProduct) {
      await editProduct(updatedProduct);
      setEditingProduct(null);
      setUpdatedProduct(null);
    }
  };

  return (
    <div className="product-page">
      <h1 className="title">Produktsidan</h1>

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
              <button className="btn updateBtn" onClick={() => { setEditingProduct(product); setUpdatedProduct({...product}); }}>Ändra</button>
              <button className="btn deleteBtn" onClick={() => removeProduct(product.id)}>Radera</button>

              {editingProduct?.id === product.id && (
                <div className="edit-form">
                  <input type="text" name="name" value={updatedProduct?.name || ""} onChange={handleChange} />
                  <input type="text" name="category" value={updatedProduct?.category || ""} onChange={handleChange} />
                  <textarea name="description" value={updatedProduct?.description || ""} onChange={handleChange} />
                  <input type="number" name="price" value={updatedProduct?.price || ""} onChange={handleChange} />
                  <button className="btn saveBtn" onClick={handleUpdate}>Spara</button>
                  <button className="btn cancelBtn" onClick={() => setEditingProduct(null)}>Avbryt</button>
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