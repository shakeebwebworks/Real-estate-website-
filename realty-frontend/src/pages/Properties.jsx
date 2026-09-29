import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard.jsx";
import { fetchProperties } from "../api.js";
import useTitle from "../hooks/useTitle.js";

const PAGE_SIZE = 6; // must match PAGE_SIZE in Django settings.py
const emptyFilters = { search: "", city: "", type: "", status: "", min_price: "", max_price: "", bedrooms: "" };

export default function Properties() {
  useTitle("Properties", "Browse apartments, villas and more with REALTY.");
  const [searchParams] = useSearchParams();
  const cityFromLink = searchParams.get("city") || "";
  const initial = { ...emptyFilters, city: cityFromLink };

  const [form, setForm] = useState(initial);
  const [filters, setFilters] = useState(initial);
  const [ordering, setOrdering] = useState("-created_at");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // If someone arrives from a "/properties/?city=Goa" link, apply that filter
  useEffect(() => {
    if (cityFromLink) { setForm((f) => ({ ...f, city: cityFromLink })); setFilters((f) => ({ ...f, city: cityFromLink })); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityFromLink]);

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchProperties({ ...filters, ordering, page })
      .then(({ items, count }) => { setItems(items); setCount(count); })
      .catch(() => setError("Could not load properties. Is the Django server running?"))
      .finally(() => setLoading(false));
  }, [filters, ordering, page]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const search = (e) => { e.preventDefault(); setPage(1); setFilters(form); };
  const reset = () => { setForm(emptyFilters); setFilters(emptyFilters); setPage(1); };
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow light">Properties</span>
          <h1>Find Your Perfect Property</h1>
          <p>{count} {count === 1 ? "property" : "properties"} available</p>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container">
          <form className="search-box filter-bar" onSubmit={search}>
            <div className="row g-3 align-items-end">
              <div className="col-md-6 col-lg-3">
                <label>Location</label>
                <input className="form-control" name="search" value={form.search} onChange={change} placeholder="City, area or title" />
              </div>
              <div className="col-6 col-lg-2">
                <label>Type</label>
                <select className="form-select" name="type" value={form.type} onChange={change}>
                  <option value="">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="luxury">Luxury Home</option>
                  <option value="commercial">Commercial</option>
                  <option value="plot">Plot / Land</option>
                  <option value="penthouse">Penthouse</option>
                </select>
              </div>
              <div className="col-6 col-lg-2">
                <label>Buy / Rent</label>
                <select className="form-select" name="status" value={form.status} onChange={change}>
                  <option value="">Any</option>
                  <option value="sale">Buy</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
              <div className="col-6 col-lg-2">
                <label>Min Price</label>
                <select className="form-select" name="min_price" value={form.min_price} onChange={change}>
                  <option value="">Any</option>
                  <option value="5000000">₹50 L</option>
                  <option value="10000000">₹1 Cr</option>
                  <option value="20000000">₹2 Cr</option>
                </select>
              </div>
              <div className="col-6 col-lg-2">
                <label>Max Price</label>
                <select className="form-select" name="max_price" value={form.max_price} onChange={change}>
                  <option value="">Any</option>
                  <option value="10000000">₹1 Cr</option>
                  <option value="30000000">₹3 Cr</option>
                  <option value="50000000">₹5 Cr</option>
                  <option value="100000000">₹10 Cr</option>
                </select>
              </div>
              <div className="col-6 col-lg-1">
                <label>Beds</label>
                <select className="form-select" name="bedrooms" value={form.bedrooms} onChange={change}>
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
              <div className="col-12 d-flex gap-2">
                <button className="btn btn-dark"><i className="bi bi-search me-2"></i>Search</button>
                <button type="button" className="btn btn-outline-dark" onClick={reset}>Reset</button>
              </div>
            </div>
          </form>

          <div className="d-flex justify-content-between align-items-center my-4 flex-wrap gap-2">
            <span className="muted">Showing {items.length} of {count} results</span>
            <select className="form-select w-auto" value={ordering} onChange={(e) => { setOrdering(e.target.value); setPage(1); }} aria-label="Sort properties">
              <option value="-created_at">Newest first</option>
              <option value="price">Price: low to high</option>
              <option value="-price">Price: high to low</option>
            </select>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <p className="muted text-center py-5">Loading properties...</p>}
          {!loading && !error && items.length === 0 && (
            <p className="muted text-center py-5">No properties match your search. Try changing the filters.</p>
          )}

          {!loading && (
            <div className="row g-4">
              {items.map((p) => (
                <div className="col-md-6 col-lg-4" key={p.id}><PropertyCard p={p} /></div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="mt-5" aria-label="Pagination">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <li key={n} className={`page-item ${n === page ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setPage(n)}>{n}</button>
                  </li>
                ))}
                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}