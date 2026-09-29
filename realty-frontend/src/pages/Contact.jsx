import { useState } from "react";
import Reveal from "../components/Reveal.jsx";
import { submitForm } from "../api.js";
import useTitle from "../hooks/useTitle.js";

export default function Contact() {
  useTitle("Contact", "Get in touch with the REALTY team.");
  const empty = { name: "", email: "", phone: "", subject: "", message: "" };
  const [form, setForm] = useState(empty);
  const [state, setState] = useState({ status: "idle", text: "" });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const send = async (e) => {
    e.preventDefault();
    setState({ status: "sending", text: "" });
    try {
      // General contact messages are stored as inquiries with no specific property
      await submitForm("inquiries", {
        name: form.name, email: form.email, phone: form.phone,
        message: `Subject: ${form.subject}\n\n${form.message}`,
      });
      setForm(empty);
      setState({ status: "ok", text: "Thanks! We'll get back to you shortly." });
    } catch (err) {
      setState({ status: "error", text: err.message });
    }
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow light">Contact</span>
          <h1>We'd Love to Hear From You</h1>
          <p>Questions about a property or our services? Reach out anytime.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="row g-5">
              <div className="col-lg-7">
                <div className="side-card">
                  <h2 className="h4 mb-4">Send a Message</h2>
                  <form onSubmit={send} className="row g-3">
                    <div className="col-md-6"><input className="form-control" name="name" placeholder="Name" value={form.name} onChange={change} required /></div>
                    <div className="col-md-6"><input className="form-control" type="email" name="email" placeholder="Email" value={form.email} onChange={change} required /></div>
                    <div className="col-md-6"><input className="form-control" name="phone" placeholder="Phone" value={form.phone} onChange={change} required /></div>
                    <div className="col-md-6"><input className="form-control" name="subject" placeholder="Subject" value={form.subject} onChange={change} required /></div>
                    <div className="col-12"><textarea className="form-control" rows="5" name="message" placeholder="Message" value={form.message} onChange={change} required /></div>
                    <div className="col-12">
                      <button className="btn btn-accent btn-lg" disabled={state.status === "sending"}>
                        {state.status === "sending" ? "Sending..." : "Send Message"}
                      </button>
                      {state.text && <div className={`mt-3 ${state.status === "ok" ? "text-success" : "text-danger"}`}>{state.text}</div>}
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="side-card h-100">
                  <h2 className="h4 mb-4">Contact Details</h2>
                  <p className="mb-3"><i className="bi bi-geo-alt me-2 text-accent"></i>REALTY House, MG Road, Bengaluru, Karnataka 560001</p>
                  <p className="mb-3"><i className="bi bi-telephone me-2 text-accent"></i>+91 98765 43210</p>
                  <p className="mb-3"><i className="bi bi-envelope me-2 text-accent"></i>hello@realty.example</p>
                  <p className="mb-4"><i className="bi bi-clock me-2 text-accent"></i>Mon – Sat, 9:00 AM – 7:00 PM</p>
                  <div className="map-wrap" style={{ height: 220 }}>
                    <iframe title="Office location" src="https://maps.google.com/maps?q=Bengaluru&output=embed" loading="lazy" />
                  </div>
                  <div className="socials mt-4"><i className="bi bi-instagram"></i><i className="bi bi-linkedin"></i><i className="bi bi-facebook"></i></div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}