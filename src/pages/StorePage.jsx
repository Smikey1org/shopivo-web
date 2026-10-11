import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { getProducts } from "../api/product.api.js";
import { useNavigate } from "react-router-dom";

export default function StorePage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchProducts() {
      try {
        const data = await getProducts();

        if (active) {
          // Supports either an array or { products: [...] }.
          setProducts(Array.isArray(data) ? data : (data.products ?? []));
        }
      } catch (err) {
        if (active) {
          setError(err.response?.data?.message || "Failed to load products.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      active = false;
    };
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <section>
      <h1>Store</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {products.length === 0 && !error && <p>No products found.</p>}

      <div className="grid">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard key={product.id} p={product} />
            <button  onClick={() => navigate(`/products/${product.id}`)}>
              View
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
