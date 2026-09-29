import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Properties from "./pages/Properties.jsx";
import PropertyDetail from "./pages/PropertyDetail.jsx";
import Agents from "./pages/Agents.jsx";
import AgentDetail from "./pages/AgentDetail.jsx";
import Locations from "./pages/Locations.jsx";
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties/" element={<Properties />} />
          <Route path="/properties/:slug/" element={<PropertyDetail />} />
          <Route path="/agents/" element={<Agents />} />
          <Route path="/agents/:id/" element={<AgentDetail />} />
          <Route path="/locations/" element={<Locations />} />
          <Route path="/services/" element={<Services />} />
          <Route path="/about/" element={<About />} />
          <Route path="/contact/" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}