import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard.jsx";
import { fetchProperty, fetchProperties, submitForm, formatPrice, PLACEHOLDER } from "../api.js";
import useTitle from "../hooks/useTitle.js";

const FEATURES = ["Modular kitchen", "Wooden flooring", "Private balcony", "Covered parking", "Vastu compliant", "24/7 water supply"];
const AMENITIES = [
  ["bi-water", "Swimming Pool"], ["bi-activity", "Gym"], ["bi-shield-lock", "24/7 Security"],
  ["bi-tree", "Landscaped Garden"], ["bi-lightning-charge", "Power Backup"], ["bi-people", "Clubhouse"],
];

function ContactForm({ propertyId, mode }) {
  const isVisit = mode === "visit";
  const empty = { name: "", phone: "", email: "", message: "", preferred_date: "", preferred_time: "" };
  const [form, setForm] = useState(empty);
  const [state, setState] = useState({ status: "idle", text: "" });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const send = async (e) => {
    e.preventDefault();
    setState({ status: "sending", text: "" });
    try {
      const body = { name: form.name, phone: form.phone, email: form.email, message: form.message, property: propertyId };
      if (isVisit) { body.preferred_date = form.preferred_date; body.preferred_time = form.preferred_time; }
      await submitForm(isVisit ? "appointments" : "inquiries", body);
      setForm(empty);
      setState({ status: "ok", text: isVisit ? "Viewing requested. We'll confirm shortly." : "Thank you! An agent will contact you soon." });
    } catch (err) {
      setState({ status: "error", text: err.message });
    }
  };

  return (
    <form onSubmit={send} className="d-grid gap-3">
      <input className="form-control" name="name" placeholder="Your name" value={form.name} onChange={change} required />
      <input className="form-control" name="phone" placeholder="Phone" value={form.phone} onChange={change} required />
      <input className="form-control" type="email" name="email" placeholder="Email" value={form.email} onChange={change} required />
      {isVisit && (
        <div className="row g-2">
          <div className="col-6"><input className="form-control" type="date" name="preferred_date" value={form.preferred_date} onChange={change} required /></div>
          <div className="col-6"><input className="form-control" type="time" name="preferred_time" value={form.preferred_time} onChange={change} required /></div>
        </div>
      )}
      <textarea className="form-control" rows="3" name="message" placeholder="Message" value={form.message} onChange={change} required={!isVisit} />
      <button className="btn btn-accent" disabled={state.status === "sending"}>
        {state.status === "sending" ? "Sending..." : isVisit ? "Request a Viewing" : "Send Inquiry"}
      </button>
      {state.text && <div className={`small ${state.status === "ok" ? "text-success" : "text-danger"}`}>{state.text}</div>}
    </form>
  );
}

export default function PropertyDetail() {
  const { slug } = useParams();
  const [p, setP] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState("visit");
  const [error, setError] = useState("");

  useEffect(() => {
    setP(null); setError(""); setActive(0);
    window.scrollTo(0, 0);
    fetchProperty(slug)
      .then((data) => {
        setP(data);
        return fetchProperties({ city: data.city }).then(({ items }) => setSimilar(items.filter((i) => i.slug !== slug).slice(0, 3)));
      })
      .catch(() => setError("We couldn't find this property."));
  }, [slug]);

  useTitle(p?.title, p?.description?.slice(0, 150));

  if (error) return <section className="page-hero slim"><div className="container"><h1>{error}</h1><Link to="/properties/" className="btn btn-accent mt-3">Back to Properties</Link></div></section>;
  if (!p) return <section className="page-hero slim"><div className="container"><h1>Loading...</h1></div></section>;

  const images = p.images.length ? p.images.map((i) => i.image) : [PLACEHOLDER];
  const facts = [["bi-door-closed", `${p.bedrooms} Bedrooms`], ["bi-droplet", `${p.bathrooms} Bathrooms`], ["bi-aspect-ratio", `${p.area.toLocaleString("en-IN")} sq.ft.`], ["bi-house", p.type_label]];
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(`${p.location}, ${p.city}`)}&output=embed`;

  return (
    <>
      <section className="page-hero slim">
        <div className="container">
          <Link to="/properties/" className="back-link"><i className="bi bi-arrow-left me-1"></i>All properties</Link>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <div className="gallery-main"><img src={images[active]} alt={`${p.title} photo ${active + 1}`} /></div>
              {images.length > 1 && (
                <div className="gallery-thumbs">
                  {images.map((src, i) => (
                    <button key={src} className={i === active ? "on" : ""} onClick={() => setActive(i)} aria-label={`Show photo ${i + 1}`}>
                      <img src={src} alt="" />
                    </button>
                  ))}
                </div>
              )}

              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mt-4">
                <div>
                  <span className="badge-status static">{p.status_label}</span>
                  <h1 className="detail-title">{p.title}</h1>
                  <p className="muted mb-0"><i className="bi bi-geo-alt me-1"></i>{p.location}, {p.city}</p>
                </div>
                <div className="price fs-2 m-0">{formatPrice(p.price, p.status)}</div>
              </div>

              <div className="facts">
                {facts.map(([icon, text]) => <div key={text}><i className={`bi ${icon}`}></i><span>{text}</span></div>)}
              </div>

              <h2 className="detail-h">About this property</h2>
              <p className="muted" style={{ whiteSpace: "pre-line" }}>{p.description}</p>

              <h2 className="detail-h">Features</h2>
              <ul className="check-list">{FEATURES.map((f) => <li key={f}><i className="bi bi-check2-circle"></i>{f}</li>)}</ul>

              <h2 className="detail-h">Amenities</h2>
              <div className="row g-3">
                {AMENITIES.map(([icon, name]) => (
                  <div className="col-6 col-md-4" key={name}><div className="amenity"><i className={`bi ${icon}`}></i>{name}</div></div>
                ))}
              </div>

              <h2 className="detail-h">Floor plan</h2>
              <div className="floorplan"><i className="bi bi-bounding-box"></i><p>Floor plan available on request. Request a viewing to see it.</p></div>

              <h2 className="detail-h">Location</h2>
              <div className="map-wrap"><iframe title={`Map of ${p.location}, ${p.city}`} src={mapSrc} loading="lazy" /></div>
            </div>

            <aside className="col-lg-4">
              <div className="sticky-side">
                {p.agent && (
                  <div className="side-card agent-mini">
                    <img src={p.agent.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.agent.name)}&background=b08d57&color=fff&size=120`} alt={p.agent.name} />
                    <div>
                      <strong>{p.agent.name}</strong>
                      <span>{p.agent.designation}</span>
                    </div>
                    <a href={`tel:${p.agent.phone}`} className="btn btn-dark btn-sm ms-auto">Contact Agent</a>
                  </div>
                )}
                <div className="side-card">
                  <div className="btn-group tabs mb-3 w-100">
                    <button type="button" className={`tab ${tab === "visit" ? "active" : ""}`} onClick={() => setTab("visit")}>Schedule a Visit</button>
                    <button type="button" className={`tab ${tab === "inquiry" ? "active" : ""}`} onClick={() => setTab("inquiry")}>Inquiry</button>
                  </div>
                  <h3 className="h5 mb-3">{tab === "visit" ? "Request a Viewing" : "Interested in this property?"}</h3>
                  <ContactForm key={tab} propertyId={p.id} mode={tab} />
                </div>
              </div>
            </aside>
          </div>

          {similar.length > 0 && (
            <div className="mt-5 pt-5">
              <div className="section-head"><span className="eyebrow">You may also like</span><h2>Similar Properties</h2></div>
              <div className="row g-4">
                {similar.map((s) => <div className="col-md-6 col-lg-4" key={s.id}><PropertyCard p={s} /></div>)}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}