import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Title from "../components/Title";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="home-page">
        <Title title="My Products" className="home-title" />
        <p className="loading-text">Loading products...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="home-page">
        <Title title="My Products" className="home-title" />
        <div className="error-state">
          <span className="error-icon">⚠️</span>
          <p>Something went wrong: {error}</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="home-page">
      <Title title="My Products" className="home-title" />
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default Home;
