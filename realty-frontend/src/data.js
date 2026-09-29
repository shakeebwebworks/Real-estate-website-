const img = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const properties = [
  { id: 1, slug: "luxury-villa-bangalore", title: "Luxury Villa", city: "Bangalore, Karnataka", price: "₹2.8 Cr", beds: 4, baths: 4, area: "3,200", status: "For Sale", image: img("photo-1613490493576-7fde63acd811") },
  { id: 2, slug: "sea-view-apartment-mumbai", title: "Sea View Apartment", city: "Mumbai, Maharashtra", price: "₹4.5 Cr", beds: 3, baths: 3, area: "1,850", status: "For Sale", image: img("photo-1545324418-cc1a3fa10c00") },
  { id: 3, slug: "modern-penthouse-hyderabad", title: "Modern Penthouse", city: "Hyderabad, Telangana", price: "₹3.2 Cr", beds: 4, baths: 4, area: "2,900", status: "For Sale", image: img("photo-1512917774080-9991f1c4c750") },
  { id: 4, slug: "garden-home-pune", title: "Garden Home", city: "Pune, Maharashtra", price: "₹85,000/mo", beds: 3, baths: 2, area: "1,700", status: "For Rent", image: img("photo-1568605114967-8130f3a36994") },
  { id: 5, slug: "beach-villa-goa", title: "Beach Villa", city: "Goa", price: "₹5.9 Cr", beds: 5, baths: 5, area: "4,100", status: "For Sale", image: img("photo-1600585154340-be6161a56a0c") },
  { id: 6, slug: "designer-flat-delhi", title: "Designer Flat", city: "New Delhi", price: "₹2.1 Cr", beds: 3, baths: 2, area: "1,500", status: "For Sale", image: img("photo-1600607687939-ce8a6c25118c") },
];

export const categories = [
  { name: "Apartments", count: 240, image: img("photo-1545324418-cc1a3fa10c00", 700) },
  { name: "Villas", count: 120, image: img("photo-1613490493576-7fde63acd811", 700) },
  { name: "Luxury Homes", count: 85, image: img("photo-1600585154340-be6161a56a0c", 700) },
  { name: "Commercial", count: 60, image: img("photo-1497366216548-37526070297c", 700) },
  { name: "Plots / Land", count: 75, image: img("photo-1500382017468-9049fed747ef", 700) },
  { name: "Penthouses", count: 40, image: img("photo-1512917774080-9991f1c4c750", 700) },
];

export const locations = [
  { name: "Bangalore", count: 180, image: img("photo-1596176530529-78163a4f7af2", 700) },
  { name: "Mumbai", count: 210, image: img("photo-1570168007204-dfb528c6958f", 700) },
  { name: "Hyderabad", count: 95, image: img("photo-1572445271230-a78b5944a659", 700) },
  { name: "Pune", count: 88, image: img("photo-1567157577867-05ccb1388e66", 700) },
  { name: "Delhi", count: 130, image: img("photo-1587474260584-136574528ed5", 700) },
  { name: "Goa", count: 54, image: img("photo-1512343879784-a960bf40e7f2", 700) },
];

export const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Properties" },
  { value: "1,000+", label: "Happy Clients" },
  { value: "25+", label: "Expert Agents" },
];

export const reasons = [
  { icon: "bi-shield-check", title: "Verified Listings", text: "Every property is checked by our team before it goes live." },
  { icon: "bi-person-badge", title: "Expert Agents", text: "Local specialists who guide you from first visit to keys." },
  { icon: "bi-file-earmark-text", title: "Transparent Process", text: "Clear pricing and paperwork, with no hidden surprises." },
  { icon: "bi-headset", title: "Dedicated Support", text: "One point of contact before and after you move in." },
];

export const testimonials = [
  { name: "Ananya Rao", role: "Homeowner, Bangalore", text: "REALTY found us a villa that matched every requirement. The process was smooth and honest." },
  { name: "Rohit Mehta", role: "Investor, Mumbai", text: "Professional advice and great market insight. I bought two properties through them." },
  { name: "Sneha Iyer", role: "Tenant, Pune", text: "Quick viewings, fair terms, and a team that actually replies. Highly recommended." },
];