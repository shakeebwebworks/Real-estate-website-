// Talks to the Django API. Vite forwards /api to http://127.0.0.1:8000

export function formatPrice(price, status) {
  let text;
  if (price >= 10000000) text = `₹${+(price / 10000000).toFixed(2)} Cr`;
  else if (price >= 100000) text = `₹${+(price / 100000).toFixed(2)} L`;
  else text = `₹${price.toLocaleString("en-IN")}`;
  return status === "rent" ? `${text}/mo` : text;
}

export const PLACEHOLDER = "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80";

// Turns an API property into the shape PropertyCard expects
export function toCard(p) {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    city: `${p.location}, ${p.city}`,
    price: formatPrice(p.price, p.status),
    beds: p.bedrooms,
    baths: p.bathrooms,
    area: p.area.toLocaleString("en-IN"),
    status: p.status_label,
    image: p.cover_image || PLACEHOLDER,
  };
}

export async function fetchProperties(params) {
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== "" && v != null));
  const res = await fetch(`/api/properties/?${new URLSearchParams(clean)}`);
  if (!res.ok) throw new Error("Could not load properties");
  const data = await res.json();
  return { count: data.count, items: data.results.map(toCard) };
}

// One property with all images and its agent
export async function fetchProperty(slug) {
  const res = await fetch(`/api/properties/${slug}/`);
  if (!res.ok) throw new Error("Property not found");
  return res.json();
}

// kind is "inquiries" or "appointments"
export async function submitForm(kind, data) {
  const res = await fetch(`/api/${kind}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Could not send. Please check your details.");
  return res.json();
}