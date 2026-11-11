import commercialOffice from "@/assets/commercial-office.webp";
import commercialMedical from "@/assets/commercial-medical.webp";
import commercialRetail from "@/assets/commercial-retail.webp";
import industrialWarehouse from "@/assets/industrial-warehouse.webp";
import industrialConstruction from "@/assets/industrial-construction.webp";
import industrialFactory from "@/assets/industrial-factory.webp";
import moveOutEmptyRoom from "@/assets/move-out-empty-room.webp";
import moveInKitchen from "@/assets/move-in-kitchen.webp";
import moveOutBathroom from "@/assets/move-out-bathroom.webp";

export const bookingServiceTypes = ["commercial", "industrial", "move_in_out"] as const;

export const services = [
  {
    n: "01",
    bookingType: bookingServiceTypes[0],
    bookingLabel: "Commercial Cleaning",
    title: "Commercial cleaning",
    type: "Commercial",
    text: "A fresh first impression. Cleaning for offices, retail spaces, and the places where business happens.",
    image: commercialOffice,
    details: ["Offices & retail", "Common areas", "Floors & surfaces", "Washrooms"],
  },
  {
    n: "02",
    bookingType: bookingServiceTypes[1],
    bookingLabel: "Industrial Cleaning",
    title: "Industrial cleaning",
    type: "Industrial",
    text: "Care for hard-working spaces. Thorough cleaning for warehouses, facilities, and industrial environments.",
    image: industrialWarehouse,
    details: ["Warehouses", "Facility cleaning", "Floor care", "Work areas"],
  },
  {
    n: "03",
    bookingType: bookingServiceTypes[2],
    bookingLabel: "Move-In / Move-Out Cleaning",
    title: "Move in move out cleaning",
    type: "Move in move out cleaning",
    text: "A clean start for a new place. Detailed cleaning for empty spaces, kitchens, and bathrooms before you move in or after you move out.",
    image: moveOutEmptyRoom,
    details: ["Move-in cleaning", "Move-out cleaning", "Kitchens & bathrooms", "Empty spaces"],
  },
];

// Illustrative spaces, not claimed client projects.
export const projects = [
  { title: "Office cleaning", type: "Commercial", image: commercialOffice },
  { title: "Medical facility cleaning", type: "Commercial", image: commercialMedical },
  { title: "Retail cleaning", type: "Commercial", image: commercialRetail },
  { title: "Warehouse cleaning", type: "Industrial", image: industrialWarehouse },
  { title: "Construction cleanup", type: "Industrial", image: industrialConstruction },
  { title: "Factory cleaning", type: "Industrial", image: industrialFactory },
  {
    title: "Move-out empty room",
    type: "Move in move out cleaning",
    image: moveOutEmptyRoom,
  },
  {
    title: "Move-in kitchen",
    type: "Move in move out cleaning",
    image: moveInKitchen,
  },
  {
    title: "Move-out bathroom",
    type: "Move in move out cleaning",
    image: moveOutBathroom,
  },
];
