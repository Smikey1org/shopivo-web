import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getProductById } from "../api/product.api.js";
import { createOrder } from "../api/order.api.js";

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("productId");
  const initialQty = Number(searchParams.get("quantity") || 1);
  const nav = useNavigate();

  const [p, setP] = useState(null);
  const [qty, setQty] = useState(initialQty);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState("");

useEffect(() => {
  let active = true;

  if (!id) {
    return () => {
      active = false;
    };
  }

  getProductById(id)
    .then((data) => {
      if (!active) return;

      const item = data.product ?? data;
      setP(item);

      const stock = Number(item.stock ?? 0);
      setQty(Math.min(Math.max(1, initialQty), Math.max(1, stock)));
    })
    .catch((err) => {
      if (active) {
        setError(err.response?.data?.message || "Failed to load product.");
      }
    })
    .finally(() => {
      if (active) setLoading(false);
    });

  return () => {
    active = false;
  };
}, [id, initialQty]);

  const price = Number(p?.price ?? 0);
  const stock = Number(p?.stock ?? 0);
  const quantity = Number(qty);
  const total = price * quantity;

  async function buy(e) {
    e.preventDefault();
    setError("");

    if (!p) {
      setError("Product information is unavailable.");
      return;
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      setError("Please enter a valid quantity.");
      return;
    }

    if (quantity > stock) {
      setError("The requested quantity exceeds available stock.");
      return;
    }

    const productId = p.id ?? p._id;

    if (!productId) {
      setError("Product ID is missing.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await createOrder({
        items: [
          {
            product_id: productId,
            quantity,
          },
        ],
        payment_method: "COD",
      });
      
      const order = response.order ?? response;

      const orderId = order.id ?? order.order_id ?? order._id;

      if (!orderId) {
        throw new Error("Order created, but the response has no order ID.");
      }

      nav(`/orders/${orderId}`, {
        state: { order },
        replace: true,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to place your order. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <section className="checkout-page">
        <p>Loading checkout...</p>
      </section>
    );
  }

  if (error && !p) {
    return (
      <section className="checkout-page">
        <p className="checkout-error">{error}</p>
        <Link to="/store">Back to Store</Link>
      </section>
    );
  }

  if (!p) return null;

  return (
    <section className="checkout-page">
      <Link to={`/product/${p.id ?? p._id}`} className="checkout-back">
        ← Back to Product
      </Link>

      <h1>Checkout</h1>
      <p className="checkout-subtitle">
        Review your item and place your order.
      </p>

      <div className="checkout-layout">
        <form className="checkout-card" onSubmit={buy}>
          <h2>Order Item</h2>

          <div className="checkout-product">
            {p.image || p.imageUrl ? (
              <img
                src={p.image ?? p.imageUrl}
                alt={p.name}
                className="checkout-image"
              />
            ) : (
              <div className="checkout-image checkout-image-placeholder">
                📦
              </div>
            )}

            <div className="checkout-product-info">
              <h3>{p.name}</h3>
              <p>${price.toFixed(2)} each</p>
              <p className={stock > 0 ? "checkout-stock" : "checkout-error"}>
                {stock > 0 ? `${stock} in stock` : "Out of stock"}
              </p>
            </div>
          </div>

          <label htmlFor="quantity" className="checkout-label">
            Quantity
          </label>

          <input
            id="quantity"
            className="checkout-quantity"
            type="number"
            min="1"
            max={stock}
            step="1"
            value={qty}
            disabled={submitting || stock < 1}
            onChange={(e) => {
              setQty(e.target.value);
              setError("");
            }}
            required
          />

          <h2 className="payment-heading">Payment Method</h2>

          <div className="payment-option">
            <div>
              <strong>Cash on Delivery (COD)</strong>
              <p>Pay when your order arrives.</p>
            </div>
            <input
              type="radio"
              checked
              readOnly
              aria-label="Cash on Delivery"
            />
          </div>

          {error && <p className="checkout-error">{error}</p>}

          <button
            className="place-order-button"
            type="submit"
            disabled={
              submitting ||
              stock < 1 ||
              !Number.isInteger(quantity) ||
              quantity < 1 ||
              quantity > stock
            }
          >
            {submitting ? "Placing order..." : "Place COD Order"}
          </button>
        </form>

        <aside className="checkout-card checkout-summary">
          <h2>Order Summary</h2>

          <div className="checkout-summary-row">
            <span>Price</span>
            <span>${price.toFixed(2)}</span>
          </div>

          <div className="checkout-summary-row">
            <span>Quantity</span>
            <span>
              {Number.isInteger(quantity) && quantity > 0 ? quantity : "—"}
            </span>
          </div>

          <div className="checkout-summary-row">
            <span>Shipping</span>
            <span>Calculated by store</span>
          </div>

          <div className="checkout-summary-total">
            <span>Subtotal</span>
            <strong>
              ${Number.isFinite(total) ? total.toFixed(2) : "0.00"}
            </strong>
          </div>

          <p className="checkout-note">
            Final order totals and stock are confirmed by the server.
          </p>
        </aside>
      </div>
    </section>
  );
}
