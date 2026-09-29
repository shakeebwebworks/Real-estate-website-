import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard.jsx";
import { toCard } from "../api.js";
import useTitle from "../hooks/useTitle.js";

const AVATAR = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=b08d57&color=fff&size=300`;

export default function AgentDetail() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.all([
      fetch(`/api/agents/${id}/`).then((r) => { if (!r.ok) throw new Error(); return r.json(); }),
      fetch(`/api/agents/${id}/properties/`).then((r) => { if (!r.ok) throw new Error(); return r.json(); }),
    ])
      .then(([agentData, props]) => { setAgent(agentData); setProperties(props.map(toCard)); })
      .catch(() => setError("We couldn't find this agent."));
  }, [id]);

  if (error) return <section className="page-hero slim"><div className="container"><h1>{error}</h1><Link to="/agents/" className="btn btn-accent mt-3">Back to Agents</Link></div></section>;
  if (!agent) return <section className="page-hero slim"><div className="container"><h1>Loading...</h1></div></section>;

  useTitle(agent.name, agent.biography?.slice(0, 150));

  return (
    <>
      <section className="page-hero slim">
        <div className="container">
          <Link to="/agents/" className="back-link"><i className="bi bi-arrow-left me-1"></i>All agents</Link>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container">
          <div className="row g-5 mb-5">
            <div className="col-lg-4">
              <img className="agent-photo-large" src={agent.photo || AVATAR(agent.name)} alt={agent.name} />
            </div>
            <div className="col-lg-8">
              <h1 className="detail-title">{agent.name}</h1>
              <p className="muted mb-3">{agent.designation} · {agent.experience_years} years experience</p>
              <p>{agent.biography}</p>
              <div className="d-flex gap-3 flex-wrap mt-3">
                <a href={`tel:${agent.phone}`} className="btn btn-dark"><i className="bi bi-telephone me-2"></i>{agent.phone}</a>
                <a href={`mailto:${agent.email}`} className="btn btn-outline-dark"><i className="bi bi-envelope me-2"></i>{agent.email}</a>
              </div>
            </div>
          </div>

          <div className="section-head text-start">
            <span className="eyebrow">Listings</span>
            <h2>Properties by {agent.name}</h2>
          </div>
          {properties.length === 0 ? (
            <p className="muted">No properties assigned yet.</p>
          ) : (
            <div className="row g-4">
              {properties.map((p) => <div className="col-md-6 col-lg-4" key={p.id}><PropertyCard p={p} /></div>)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}