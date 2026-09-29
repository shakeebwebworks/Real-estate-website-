import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard.jsx";
import Reveal from "../components/Reveal.jsx";
import { categories, locations, stats, reasons, testimonials } from "../data.js";
import { fetchProperties } from "../api.js";
import useTitle from "../hooks/useTitle.js";

function SectionHead({ eyebrow, title }) {
  return (
    <div className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

function SearchBox() {
  return (
    <form className="search-box" onSubmit={(e) => e.preventDefault()}>
      <div className="btn-group tabs mb-3" role="group">
        <button type="button" className="tab active">Buy</button>
        <button type="button" className="tab">Rent</button>
      </div>
      <div className="row g-3 align-items-end">
        <div className="col-md-6 col-lg-3">
          <label>Location</label>
          <input className="form-control" placeholder="City or area" />
        </div>
        <div className="col-md-6 col-lg-2">
          <label>Property Type</label>
          <select className="form-select"><option>All Types</option><option>Apartment</option><option>Villa</option><option>Penthouse</option><option>Commercial</option><option>Plot</option></select>
        </div>
        <div className="col-6 col-lg-2">
          <label>Min Price</label>
          <select className="form-select"><option>Any</option><option>₹50 L</option><option>₹1 Cr</option><option>₹2 Cr</option></select>
        </div>
        <div className="col-6 col-lg-2">
          <label>Max Price</label>
          <select className="form-select"><option>Any</option><option>₹1 Cr</option><option>₹3 Cr</option><option>₹5 Cr+</option></select>
        </div>
        <div className="col-6 col-lg-1">
          <label>Beds</label>
          <select className="form-select"><option>Any</option><option>1+</option><option>2+</option><option>3+</option><option>4+</option></select>
        </div>
        <div className="col-6 col-lg-2">
          <Link to="/properties/" className="btn btn-dark w-100"><i className="bi bi-search me-2"></i>Search</Link>
        </div>
      </div>
    </form>
  );
}

export default function Home() {
  useTitle("Home", "Discover exceptional properties across India with REALTY.");
  // Pulled from the Django API instead of sample data
  const [featured, setFeatured] = useState([]);
  const [showcase, setShowcase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties({ featured: "true", ordering: "-created_at" })
      .then(({ items }) => {
        setFeatured(items.slice(0, 3));
        setShowcase(items[3] || items[0] || null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <span className="eyebrow light">REALTY · Premium Real Estate</span>
          <h1>Find a Place You'll Be Proud to Call Home</h1>
          <p>Discover exceptional properties in the locations that matter most to you.</p>
          <div className="d-flex gap-3 flex-wrap">
            <Link to="/properties/" className="btn btn-accent btn-lg">Explore Properties</Link>
            <Link to="/contact/" className="btn btn-outline-light btn-lg">Contact Us</Link>
          </div>
        </div>
        <div className="container hero-search"><SearchBox /></div>
      </section>

      {/* Featured properties */}
      <section className="section pt-search">
        <div className="container">
          <Reveal>
            <SectionHead eyebrow="Featured" title="Handpicked Properties" />
            {!loading && featured.length === 0 && (
              <p className="muted text-center">No featured properties yet — tick "Featured" on a property in the admin to show it here.</p>
            )}
            <div className="row g-4">
              {featured.map((p) => (
                <div className="col-md-6 col-lg-4" key={p.id}><PropertyCard p={p} /></div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Categories */}
      <section className="section bg-soft">
        <div className="container">
          <Reveal>
            <SectionHead eyebrow="Categories" title="Browse by Property Type" />
            <div className="row g-4">
              {categories.map((c) => (
                <div className="col-6 col-lg-4" key={c.name}>
                  <Link to="/properties/" className="tile">
                    <img src={c.image} alt={c.name} loading="lazy" />
                    <div className="tile-text"><h3>{c.name}</h3><span>{c.count} listings</span></div>
                  </Link>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead eyebrow="Why REALTY" title="A Better Way to Find Home" />
            <div className="row g-4">
              {reasons.map((r) => (
                <div className="col-sm-6 col-lg-3" key={r.title}>
                  <div className="reason">
                    <i className={`bi ${r.icon}`}></i>
                    <h3>{r.title}</h3>
                    <p>{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Locations */}
      <section className="section bg-soft">
        <div className="container">
          <Reveal>
            <SectionHead eyebrow="Locations" title="Explore Top Cities" />
            <div className="row g-4">
              {locations.map((l) => (
                <div className="col-6 col-lg-4" key={l.name}>
                  <Link to="/locations/" className="tile tile-tall">
                    <img src={l.image} alt={`${l.name} skyline`} loading="lazy" />
                    <div className="tile-text"><h3>{l.name}</h3><span>{l.count} properties · Explore <i className="bi bi-arrow-right"></i></span></div>
                  </Link>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="container">
          <div className="row text-center g-4">
            {stats.map((s) => (
              <div className="col-6 col-lg-3" key={s.label}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury showcase */}
      {showcase && (
        <section className="section">
          <div className="container">
            <Reveal>
              <div className="row g-5 align-items-center">
                <div className="col-lg-7"><img className="showcase-img" src={showcase.image} alt={showcase.title} loading="lazy" /></div>
                <div className="col-lg-5">
                  <span className="eyebrow">Signature Listing</span>
                  <h2 className="mb-3">{showcase.title}, {showcase.city}</h2>
                  <p className="muted">A standout property with generous living spaces, designed for those who expect more from home.</p>
                  <div className="price fs-3 my-3">{showcase.price}</div>
                  <div className="specs mb-4"><span>{showcase.beds} Beds</span><span>{showcase.baths} Baths</span><span>{showcase.area} sq.ft.</span></div>
                  <Link to={`/properties/${showcase.slug}/`} className="btn btn-dark btn-lg">View Property</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="section bg-soft">
        <div className="container">
          <Reveal>
            <SectionHead eyebrow="Testimonials" title="Trusted by Our Clients" />
            <div className="row g-4">
              {testimonials.map((t) => (
                <div className="col-lg-4" key={t.name}>
                  <blockquote className="quote">
                    <div className="stars">{"★★★★★"}</div>
                    <p>“{t.text}”</p>
                    <footer><strong>{t.name}</strong><span>{t.role}</span></footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container text-center">
          <h2>Ready to Find Your Next Property?</h2>
          <p>Talk to an expert agent and book a viewing this week.</p>
          <Link to="/contact/" className="btn btn-accent btn-lg">Request a Viewing</Link>
        </div>
      </section>
    </>
  );
}