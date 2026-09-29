import { useState } from "react";
import { Link } from "react-router-dom";

export default function PropertyCard({ p }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className="prop-card">
      <div className="prop-img">
        <img src={p.image} alt={`${p.title} in ${p.city}`} loading="lazy" />
        <span className="badge-status">{p.status}</span>
        <button className={`heart ${liked ? "on" : ""}`} aria-label="Save property" onClick={() => setLiked(!liked)}>
          <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`}></i>
        </button>
      </div>
      <div className="prop-body">
        <h3>{p.title}</h3>
        <p className="muted"><i className="bi bi-geo-alt me-1"></i>{p.city}</p>
        <div className="price">{p.price}</div>
        <div className="specs">
          <span><i className="bi bi-door-closed"></i>{p.beds} Beds</span>
          <span><i className="bi bi-droplet"></i>{p.baths} Baths</span>
          <span><i className="bi bi-aspect-ratio"></i>{p.area} sq.ft.</span>
        </div>
        <Link to={`/properties/${p.slug}/`} className="link-arrow">View Property <i className="bi bi-arrow-right"></i></Link>
      </div>
    </article>
  );
}