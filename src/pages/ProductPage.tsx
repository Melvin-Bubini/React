import { useProducts } from "../context/ProductContext";
import "../css/ProductPage.css";
const ProductPage = () => {

  const { products, loading } = useProducts();

  if (loading) {
    return <p className="text-center text-gray-500">Laddar produkter...</p>;
  }

  return (
    <div className="product-page">
      <h1 className="title">Produktsidan</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="category">{product.category}</p>
            <p className="description">{product.description}</p>
            <p className="price">{product.price} kr</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage
