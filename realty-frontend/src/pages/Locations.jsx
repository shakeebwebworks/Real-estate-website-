import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import { locations } from "../data.js";
import useTitle from "../hooks/useTitle.js";

export default function Locations() {
  useTitle("Locations", "Explore top cities to find your next property.");
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow light">Locations</span>
          <h1>Explore Properties by City</h1>
          <p>Discover what makes each of these cities a great place to call home.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="row g-4">
              {locations.map((l) => (
                <div className="col-md-6 col-lg-4" key={l.name}>
                  <Link to={`/properties/?city=${encodeURIComponent(l.name)}`} className="tile tile-tall">
                    <img src={l.image} alt={`${l.name} skyline`} loading="lazy" />
                    <div className="tile-text"><h3>{l.name}</h3><span>{l.count} properties · Explore <i className="bi bi-arrow-right"></i></span></div>
                  </Link>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}