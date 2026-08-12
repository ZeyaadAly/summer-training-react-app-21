import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // FakeStore uses `title`; local mock uses `name` — support both
  const displayName = product.title || product.name || "Unknown Product";
  // FakeStore uses `rating.rate`; local mock uses `rating` as a number
  const ratingValue =
    typeof product.rating === "object"
      ? product.rating?.rate ?? 0
      : product.rating ?? 0;

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={displayName}
        className="product-img"
        onClick={() => navigate(`/product/${product.id}`)}
      />
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3
          className="product-name"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {displayName}
        </h3>
        <div className="product-rating">
          {"★".repeat(Math.floor(ratingValue))}
          {"☆".repeat(5 - Math.floor(ratingValue))}
          <span>{ratingValue}</span>
        </div>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart({ ...product, name: displayName })}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
