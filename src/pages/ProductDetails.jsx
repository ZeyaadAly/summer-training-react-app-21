import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="details-page">
        <button className="back-btn" onClick={() => navigate("/")}>← Back</button>
        <p className="loading-text">Loading product...</p>
      </main>
    );
  }


  if (error || !product) {
    return (
      <main className="details-page">
        <div className="error-state">
          <span className="error-icon">⚠️</span>
          <p>{error || "Product not found."}</p>
          <button className="retry-btn" onClick={() => navigate("/")}>
            ← Back to Home
          </button>
        </div>
      </main>
    );
  }

  const rating = product.rating?.rate ?? 0;

  return (
    <main className="details-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      <div className="details-card">
        <img
          src={product.image}
          alt={product.title}
          className="details-img"
        />
        <div className="details-info">
          <span className="product-category">{product.category}</span>
          <h1 className="details-name">{product.title}</h1>
          <div className="product-rating">
            {"★".repeat(Math.floor(rating))}
            {"☆".repeat(5 - Math.floor(rating))}
            <span>
              {rating} / 5{" "}
              <span style={{ color: "#bbb" }}>
                ({product.rating?.count ?? 0} reviews)
              </span>
            </span>
          </div>
          <p className="details-description">{product.description}</p>
          <div className="details-footer">
            <span className="details-price">${product.price.toFixed(2)}</span>
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart({ ...product, name: product.title })}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
