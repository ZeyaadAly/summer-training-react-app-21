import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Home() {
  return (
    <main className="home-page">
      <h1 className="page-title">Our Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default Home;
