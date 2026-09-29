import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import { stats } from "../data.js";
import useTitle from "../hooks/useTitle.js";

const TEAM = [
  { name: "Rahul Sharma", role: "Senior Property Consultant", photo: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=111111&color=fff&size=300" },
  { name: "Priya Nair", role: "Luxury Home Specialist", photo: "https://ui-avatars.com/api/?name=Priya+Nair&background=111111&color=fff&size=300" },
  { name: "Arjun Mehta", role: "Commercial Advisor", photo: "https://ui-avatars.com/api/?name=Arjun+Mehta&background=111111&color=fff&size=300" },
];

export default function About() {
  useTitle("About Us", "Learn about REALTY's mission, team and experience.");
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow light">About REALTY</span>
          <h1>A Trusted Name in Real Estate</h1>
          <p>Helping families and investors find the right property for over a decade.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="row g-5 align-items-center">
              <div className="col-lg-6">
                <span className="eyebrow">Who We Are</span>
                <h2 className="mb-3">Built on Trust, Guided by Expertise</h2>
                <p className="muted">REALTY connects buyers, sellers and tenants with properties that genuinely fit their lives, backed by local market knowledge and a transparent process from first visit to final paperwork.</p>
                <p className="muted">Every listing on our platform is personally verified by our team, so you can browse with confidence.</p>
                <Link to="/contact/" className="btn btn-dark btn-lg mt-2">Get in Touch</Link>
              </div>
              <div className="col-lg-6">
                <img className="showcase-img" src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80" alt="Our office team" loading="lazy" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container">
          <Reveal>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="reason h-100"><i className="bi bi-bullseye"></i><h3>Our Mission</h3><p>To make finding a home simple, honest and stress-free, one client at a time.</p></div>
              </div>
              <div className="col-md-6">
                <div className="reason h-100"><i className="bi bi-eye"></i><h3>Our Vision</h3><p>To be India's most trusted real estate partner for buyers, sellers and investors alike.</p></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

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

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head"><span className="eyebrow">Our Team</span><h2>The People Behind REALTY</h2></div>
            <div className="row g-4">
              {TEAM.map((t) => (
                <div className="col-md-4" key={t.name}>
                  <div className="agent-card">
                    <img src={t.photo} alt={t.name} />
                    <div className="agent-body text-center"><h3>{t.name}</h3><p className="muted mb-0">{t.role}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cta">
        <div className="container text-center">
          <h2>Ready to Work With Us?</h2>
          <p>Let's find the property that's right for you.</p>
          <Link to="/contact/" className="btn btn-accent btn-lg">Contact Us</Link>
        </div>
      </section>
    </>
  );
}