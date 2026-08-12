import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: CATEGORIES[0],
    image: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [createdProduct, setCreatedProduct] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Manual validation
    if (!form.title.trim()) {
      setErrorMsg("Title is required.");
      setStatus("error");
      return;
    }
    const parsedPrice = parseFloat(form.price);
    if (!form.price || isNaN(parsedPrice) || parsedPrice <= 0) {
      setErrorMsg("Please enter a valid price greater than 0.");
      setStatus("error");
      return;
    }
    if (!form.description.trim()) {
      setErrorMsg("Description is required.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const payload = {
      title: form.title.trim(),
      price: parsedPrice,
      description: form.description.trim(),
      category: form.category,
      image: form.image.trim() || "https://fakestoreapi.com/img/81fAn1XiTh_.jpg",
    };

    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCreatedProduct({ ...data, ...payload });
        setStatus("success");
      })
      .catch((err) => {
        setErrorMsg(err.message || "Network error — check your connection.");
        setStatus("error");
      });
  };

  const handleReset = () => {
    setForm({ title: "", price: "", description: "", category: CATEGORIES[0], image: "" });
    setStatus("idle");
    setCreatedProduct(null);
    setErrorMsg("");
  };

  if (status === "success" && createdProduct) {
    return (
      <main className="add-page">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h2 className="success-title">Product Created!</h2>
          <p className="success-sub">
            The API responded with the following product data:
          </p>
          <div className="created-product-preview">
            <img
              src={createdProduct.image || form.image || "https://placehold.co/80x80"}
              alt={createdProduct.title}
              className="created-thumb"
            />
            <div className="created-info">
              <p className="created-id">ID: #{createdProduct.id}</p>
              <p className="created-title">{createdProduct.title}</p>
              <p className="created-category">{createdProduct.category}</p>
              <p className="created-price">${parseFloat(createdProduct.price).toFixed(2)}</p>
            </div>
          </div>
          <p className="fakestore-note">
            ℹ️ FakeStore API simulates a POST — the product isn't actually persisted in their database.
          </p>
          <div className="success-actions">
            <button className="add-to-cart-btn" onClick={handleReset}>
              Add Another Product
            </button>
            <button className="back-btn-pill" onClick={() => navigate("/")}>
              Go to Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="add-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <div className="add-card">
        <div className="add-card-header">
          <h1 className="add-title">Add New Product</h1>
          <p className="add-sub">
            Fill out the form below and we'll POST it to{" "}
            <span className="api-badge">fakestoreapi.com</span>
          </p>
        </div>

        <form className="add-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">Product Title</label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-input"
              placeholder="e.g. Slim Fit Cotton Shirt"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price" className="form-label">Price ($)</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0.01"
                step="0.01"
                className="form-input"
                placeholder="e.g. 29.99"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                id="category"
                name="category"
                className="form-input"
                value={form.category}
                onChange={handleChange}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">Image URL <span className="optional">(optional)</span></label>
            <input
              id="image"
              name="image"
              type="url"
              className="form-input"
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-input form-textarea"
              placeholder="Describe the product..."
              rows={4}
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          {status === "error" && (
            <div className="form-error-banner">
              ⚠️ {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <span className="btn-spinner" />
            ) : (
              "Create Product →"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

export default AddProduct;
