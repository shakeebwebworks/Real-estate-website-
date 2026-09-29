import { useEffect } from "react";

export default function useTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | REALTY` : "REALTY | Premium Properties in India";
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
}