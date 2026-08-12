import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <main className="details-page">
        <p>Product not found.</p>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </main>
    );
  }

  return (
    <main className="details-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      <div className="details-card">
        <img
          src={product.image}
          alt={product.name}
          className="details-img"
        />
        <div className="details-info">
          <span className="product-category">{product.category}</span>
          <h1 className="details-name">{product.name}</h1>
          <div className="product-rating">
            {"★".repeat(Math.floor(product.rating))}
            {"☆".repeat(5 - Math.floor(product.rating))}
            <span>{product.rating} / 5</span>
          </div>
          <p className="details-description">{product.description}</p>
          <div className="details-footer">
            <span className="details-price">${product.price.toFixed(2)}</span>
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
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
