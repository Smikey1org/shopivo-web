import { Link } from "react-router-dom";
export default function ProductCard({ p }) {
  return (
    <article className="card">
        {p.image || p.imageUrl ? (
          <img src={p.imageUrl} alt={p.name} className="product-image" height={150} width={150}/>
        ) : (
          <div className="product-image-placeholder">No image available</div>
        )}
      <h3>{p.name}</h3>
      <p>{p.description}</p>
      <b>${Number(p.price).toFixed(2)}</b>
      <p>Stock: {p.stock}</p>
      <Link to={`/products/${p.id}`}>View</Link>
    </article>
  );
}
