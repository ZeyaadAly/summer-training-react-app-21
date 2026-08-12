import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
  const { getTotalItems, setIsDrawerOpen } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          MyShop
        </Link>

        <nav className="header-nav">
          <Link to="/add-product" className="nav-link nav-link-add">
            + Add Product
          </Link>
        </nav>

        <button
          className="cart-btn"
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Open cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 7h13M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
            />
          </svg>
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
