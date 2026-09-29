import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="brand text-white mb-3">REALTY</div>
            <p>Premium properties and honest advice across India's best locations.</p>
          </div>
          <div className="col-6 col-lg-2">
            <h6>Explore</h6>
            <Link to="/properties/">Properties</Link>
            <Link to="/services/">Services</Link>
            <Link to="/agents/">Agents</Link>
          </div>
          <div className="col-6 col-lg-2">
            <h6>Company</h6>
            <Link to="/about/">About</Link>
            <Link to="/locations/">Locations</Link>
            <Link to="/contact/">Contact</Link>
          </div>
          <div className="col-lg-4">
            <h6>Get in touch</h6>
            <p className="mb-1"><i className="bi bi-telephone me-2"></i>+91 98765 43210</p>
            <p className="mb-3"><i className="bi bi-envelope me-2"></i>hello@realty.example</p>
            <div className="socials"><i className="bi bi-instagram"></i><i className="bi bi-linkedin"></i><i className="bi bi-facebook"></i></div>
          </div>
        </div>
        <div className="copy">© {new Date().getFullYear()} REALTY. All rights reserved.</div>
      </div>
    </footer>
  );
}