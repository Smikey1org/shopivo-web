import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderById } from "../api/order.api";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const location = useLocation();

  const routeOrder = location.state?.order ?? null;

  const [fetchedOrder, setFetchedOrder] = useState(null);
  const [loading, setLoading] = useState(!routeOrder);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    // The order is already available from the previous page.
    if (routeOrder) {
      return () => {
        active = false;
      };
    }

    async function fetchOrder() {
      try {
        const data = await getOrderById(id);

        if (active) {
          setFetchedOrder(data.order ?? data);
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message || "Failed to load order details.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchOrder();

    return () => {
      active = false;
    };
  }, [id, routeOrder]);

  const order = routeOrder ?? fetchedOrder;

  if (loading) {
    return (
      <section className="order-details">
        <p>Loading order details...</p>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="order-details">
        <p className="order-error">{error || "Order not found."}</p>
        <Link to="/orders" className="back-link">
          ← Back to Orders
        </Link>
      </section>
    );
  }

  const items = order.items ?? order.orderItems ?? [];

  const formatPrice = (value) => `$${Number(value ?? 0).toFixed(2)}`;

  const status = (order.status ?? "pending").toLowerCase();

  return (
    <section className="order-details">
      <Link to="/orders" className="back-link">
        ← Back to Orders
      </Link>

      <div className="order-header">
        <div>
          <p className="eyebrow">ORDER DETAILS</p>
          <h1>Order #{order.id ?? order._id ?? id}</h1>
          <p className="order-date">
            Placed on{" "}
            {order.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : "Date unavailable"}
          </p>
        </div>

        <span className={`status-badge status-${status}`}>
          {status.replaceAll("_", " ")}
        </span>
      </div>

      <div className="order-layout">
        <div className="order-main">
          <article className="details-card">
            <h2>Items Ordered</h2>

            {items.length === 0 ? (
              <p className="muted">No item details available.</p>
            ) : (
              <div className="items-list">
                {items.map((item, index) => {
                  const product = item.product ?? item;
                  const quantity = Number(item.quantity ?? 1);
                  const price = Number(item.unit_price ?? product.price ?? 0);

                  return (
                    <div
                      className="order-item"
                      key={item.id ?? item._id ?? index}
                    >
                      {product.image ? (
                        <img
                          className="item-image"
                          src={product.image}
                          alt={product.product_name ?? "Product"}
                        />
                      ) : (
                        <div className="item-placeholder">📦</div>
                      )}

                      <div className="item-info">
                        <h3>{product.product_name ?? "Product"}</h3>
                        <p>Qty: {quantity}</p>
                        <p>{formatPrice(price)} each</p>
                      </div>

                      <strong className="item-total">
                        {formatPrice(price * quantity)}
                      </strong>
                    </div>
                  );
                })}
              </div>
            )}
          </article>

          <article className="details-card">
            <h2>Shipping Address</h2>

            {order.shippingAddress ? (
              <div className="address-content">
                {typeof order.shippingAddress === "string" ? (
                  <p>{order.shippingAddress}</p>
                ) : (
                  <>
                    {order.shippingAddress.fullName && (
                      <p>{order.shippingAddress.fullName}</p>
                    )}
                    {order.shippingAddress.address && (
                      <p>{order.shippingAddress.address}</p>
                    )}
                    {order.shippingAddress.street && (
                      <p>{order.shippingAddress.street}</p>
                    )}
                    <p>
                      {[
                        order.shippingAddress.city,
                        order.shippingAddress.state,
                        order.shippingAddress.postalCode,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                    {order.shippingAddress.country && (
                      <p>{order.shippingAddress.country}</p>
                    )}
                  </>
                )}
              </div>
            ) : (
              <p className="muted">Shipping address unavailable.</p>
            )}
          </article>
        </div>

        <aside className="details-card summary-card">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>
              {formatPrice(
                order.subtotal ??
                  items.reduce(
                    (sum, item) =>
                      sum +
                      Number(item.unit_price ?? item.product?.price ?? 0) *
                        Number(item.quantity ?? 1),
                    0,
                  ),
              )}
            </span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>{formatPrice(order.shippingCost ?? 0)}</span>
          </div>

          <div className="summary-row">
            <span>Tax</span>
            <span>{formatPrice(order.tax ?? 0)}</span>
          </div>

          <div className="summary-row summary-total">
            <strong>Total</strong>
            <strong>
              {formatPrice(order.total ?? order.totalPrice ?? order.amount)}
            </strong>
          </div>

          <div className="payment-info">
            <h3>Payment</h3>
            <p>{order.payment_method ?? "Not specified"}</p>
            <p>Payment status: {order.paymentStatus ?? "Unknown"}</p>
          </div>

          <Link to="/store" className="continue-shopping">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}
