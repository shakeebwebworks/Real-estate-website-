import { useEffect, useState } from "react";
import useTitle from "../hooks/useTitle.js";
import { Link } from "react-router-dom";

const AVATAR = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=b08d57&color=fff&size=300`;

export default function Agents() {
  useTitle("Our Agents", "Meet REALTY's expert real estate agents.");
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/agents/")
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then(setAgents)
      .catch(() => setError("Could not load agents. Is the Django server running?"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow light">Our Team</span>
          <h1>Meet Our Expert Agents</h1>
          <p>Local specialists who guide you from first visit to keys.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <p className="muted text-center py-5">Loading agents...</p>}
          {!loading && !error && agents.length === 0 && (
            <p className="muted text-center py-5">No agents yet. Add one in the admin panel.</p>
          )}
          <div className="row g-4">
            {agents.map((a) => (
              <div className="col-md-6 col-lg-4" key={a.id}>
                <div className="agent-card">
                  <img src={a.photo || AVATAR(a.name)} alt={a.name} />
                  <div className="agent-body">
                    <h3>{a.name}</h3>
                    <p className="muted mb-2">{a.designation}</p>
                    {a.location && <p className="small muted mb-1"><i className="bi bi-geo-alt me-1"></i>{a.location}</p>}
                    <p className="small muted mb-1"><i className="bi bi-telephone me-1"></i>{a.phone}</p>
                    <p className="small muted mb-3"><i className="bi bi-envelope me-1"></i>{a.email}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge-count">{a.properties_count} {a.properties_count === 1 ? "property" : "properties"}</span>
                      <Link to={`/agents/${a.id}/`} className="link-arrow">View Profile <i className="bi bi-arrow-right"></i></Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}