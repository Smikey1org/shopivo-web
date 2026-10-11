import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../api/order.api";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(Array.isArray(data) ? data : (data.orders ?? []));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <section>
      <h1>My Orders</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {orders.length === 0 && !error && <p>No orders found.</p>}
      {orders.map((order) => (
        <article className="card" key={order.id}>
          <h3>Order #{order.id}</h3>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total}</p>

          <Link to={`/order/${order.id}`} state={{ order: order }}>
            <span style={{ color: "#007bff" }}>View</span>
          </Link>
        </article>
      ))}
    </section>
  );
}
