import office from "@/assets/crosen-office.jpg";
import home from "@/assets/crosen-home.jpg";
import industrial from "@/assets/crosen-industrial.jpg";

export const services = [
  {
    n: "01",
    title: "Commercial cleaning",
    type: "Commercial",
    text: "A fresh first impression. Cleaning for offices, retail spaces, and the places where business happens.",
    image: office,
    details: ["Offices & retail", "Common areas", "Floors & surfaces", "Washrooms"],
  },
  {
    n: "02",
    title: "Industrial cleaning",
    type: "Industrial",
    text: "Care for hard-working spaces. Thorough cleaning for warehouses, facilities, and industrial environments.",
    image: industrial,
    details: ["Warehouses", "Facility cleaning", "Floor care", "Work areas"],
  },
  {
    n: "03",
    title: "Residential cleaning",
    type: "Residential",
    text: "Come home to a little more calm. Thoughtful cleaning for your living spaces, kitchens, and bathrooms.",
    image: home,
    details: ["Living spaces", "Kitchens & baths", "Deep cleaning", "Move-in / move-out"],
  },
];

// Illustrative spaces, not claimed client projects.
export const projects = services.map((s) => ({ title: s.title, type: s.type, image: s.image }));
