import { useProducts } from "../context/ProductContext";

const HomePage = () => {
    const { products, loading } = useProducts();

    return (
        <>
            <div className="product-page">
                <h1 className="title">De senaste produkterna</h1>
                {loading ? (
                    <h3 className="errorMessage">Laddar produkter...</h3>
                ) : !products.length ? (
                    <h3 className="errorMessage">Inga produkter finns.</h3>
                ) : (
                    <div className="product-grid">
                        {products.slice(0, 3).map((product) => (
                            <div key={product.id} className="product-card">
                                <h3>{product.name}</h3>
                                <p className="category">{product.category}</p>
                                <p className="description">{product.description}</p>
                                <p className="price">{product.price} kr</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default HomePage;

