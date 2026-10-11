import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../api/product.api.js";

export default function ProductPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [quantity, setQuantity] = useState(1);

const [productResult, setProductResult] = useState({
  id: null,
  product: null,
  loading: true,
  error: "",
});

useEffect(() => {
  let active = true;

  getProductById(id)
    .then((data) => {
      if (!active) return;

      setProductResult({
        id,
        product: data.product ?? data,
        loading: false,
        error: "",
      });
    })
    .catch((err) => {
      if (!active) return;

      setProductResult({
        id,
        product: null,
        loading: false,
        error: err.response?.data?.message || "Failed to load product details.",
      });
    });

  return () => {
    active = false;
  };
}, [id]);

const currentResult = productResult.id === id ? productResult : null;

const p = currentResult?.product ?? null;
const loading = !currentResult || currentResult.loading;
const error = currentResult?.error ?? "";
  const handleBuyNow = () => {
    if (!p || Number(p.stock) < quantity) return;

    nav(
      `/checkout?productId=${encodeURIComponent(p.id ?? p._id)}&quantity=${quantity}`,
    );
  };

  if (loading) {
    return (
      <section className="product-page">
        <p>Loading product...</p>
      </section>
    );
  }

  if (error || !p) {
    return (
      <section className="product-page">
        <p className="product-error">{error || "Product not found."}</p>
        <Link to="/store" className="back-link">
          ← Back to Store
        </Link>
      </section>
    );
  }

  const stock = Number(p.stock ?? 0);
  const price = Number(p.price ?? 0);
  const outOfStock = stock <= 0;
  const productId = p.id ?? p._id;

  return (
    <section className="product-page">
      <Link to="/store" className="back-link">
        ← Back to Store
      </Link>

      <div className="product-detail">
        <div className="product-image-wrap">
          {p.image || p.imageUrl ? (
            <img
              src={p.imageUrl}
              alt={p.name}
              className="product-image"
            />
          ) : (
            <div className="product-image-placeholder">No image available</div>
          )}
        </div>

        <div className="product-info">
          <p className="product-eyebrow">SHOPIVO STORE</p>

          <h1>{p.name}</h1>

          {p.category && <p className="product-category">{p.category}</p>}

          <p className="product-description">
            {p.description || "No description available."}
          </p>

          <div className="product-price">${price.toFixed(2)}</div>

          <p className={outOfStock ? "stock-out" : "stock-in"}>
            {outOfStock ? "Out of stock" : `${stock} available in stock`}
          </p>

          {!outOfStock && (
            <>
              <div className="quantity-control">
                <label htmlFor="quantity">Quantity</label>

                <div className="quantity-buttons">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={quantity >= stock}
                    onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="product-total">
                <span>Subtotal</span>
                <strong>${(price * quantity).toFixed(2)}</strong>
              </div>

              <button
                type="button"
                className="buy-now-button"
                onClick={handleBuyNow}
                disabled={!productId || stock < quantity}
              >
                Buy Now · ${(price * quantity).toFixed(2)}
              </button>
            </>
          )}

          <p className="product-note">
            Secure checkout · Order details confirmed at checkout
          </p>
        </div>
      </div>
    </section>
  );
}
