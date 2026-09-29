import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import useTitle from "../hooks/useTitle.js";

const SERVICES = [
  ["bi-house-check", "Property Buying", "Guidance from shortlisting to closing, so you buy with full confidence."],
  ["bi-tags", "Property Selling", "Pricing, marketing and negotiation support to sell at the best value."],
  ["bi-key", "Property Renting", "Find verified tenants or the right rental home, hassle-free."],
  ["bi-building-gear", "Property Management", "Day-to-day management for owners who want a hands-off experience."],
  ["bi-graph-up-arrow", "Investment Consulting", "Data-backed advice on where and when to invest."],
  ["bi-building", "Commercial Real Estate", "Offices, retail and warehouse spaces for growing businesses."],
  ["bi-calculator", "Property Valuation", "Accurate, market-based valuations for any property."],
];

export default function Services() {
  useTitle("Services", "Buying, selling, renting and property management with REALTY.");
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow light">What We Offer</span>
          <h1>Real Estate Services, End to End</h1>
          <p>Whatever stage you're at, our team is here to help.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="row g-4">
              {SERVICES.map(([icon, title, text]) => (
                <div className="col-md-6 col-lg-4" key={title}>
                  <div className="reason h-100 d-flex flex-column">
                    <i className={`bi ${icon}`}></i>
                    <h3>{title}</h3>
                    <p className="flex-grow-1">{text}</p>
                    <Link to="/contact/" className="link-arrow">Learn More <i className="bi bi-arrow-right"></i></Link>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cta">
        <div className="container text-center">
          <h2>Not Sure Where to Start?</h2>
          <p>Tell us what you need and we'll point you to the right service.</p>
          <Link to="/contact/" className="btn btn-accent btn-lg">Talk to Us</Link>
        </div>
      </section>
    </>
  );
}