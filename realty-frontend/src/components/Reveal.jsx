import { useEffect, useRef } from "react";

// Wrap any block to fade/slide it in when it scrolls into view.
export default function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}