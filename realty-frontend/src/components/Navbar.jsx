import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

const links = [
  ["Home", "/"], ["Properties", "/properties/"], ["Locations", "/locations/"],
  ["Services", "/services/"], ["About", "/about/"], ["Agents", "/agents/"], ["Contact", "/contact/"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-nav ${scrolled || open ? "is-solid" : ""}`}>
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/" className="brand">REALTY</Link>
        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)}>{label}</NavLink>
          ))}
          <Link to="/contact/" className="btn btn-accent d-lg-none mt-2">Schedule a Visit</Link>
        </nav>
        <Link to="/contact/" className="btn btn-accent d-none d-lg-inline-block">Schedule a Visit</Link>
        <button className="menu-btn d-lg-none" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          <i className={`bi ${open ? "bi-x-lg" : "bi-list"}`}></i>
        </button>
      </div>
    </header>
  );
}