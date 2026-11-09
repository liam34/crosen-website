import type { Metadata } from "next";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const mapUrl = "https://share.google/TueFSgv9j8KX6wxDu";
const mapEmbedUrl =
  "https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1s4004+97+St+NW,+Edmonton,+AB+T6E+6N1";

export const metadata: Metadata = {
  title: "Find Us",
  description: "Find the Crosen Cleaning Services Inc. office and get directions with Google Maps.",
};

export default function FindUsPage() {
  return (
    <section className="bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1fr_auto] md:items-center md:py-28">
        <div>
          <p className="eyebrow">Visit Crosen</p>
          <h1 className="mt-5 max-w-xl text-4xl font-bold leading-tight md:text-6xl">Find Us</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Planning a visit? Open our office location in Google Maps for directions.
          </p>
          <div className="mt-6 space-y-2 text-sm text-blue-700">
            <p>
              <span className="font-semibold">Our Address:</span> 4004 97 St NW, Edmonton, AB T6E
              6N1
            </p>
            <p>
              <span className="font-semibold">Hours:</span> Weekdays, 8:00 AM–4:00 PM
            </p>
            <p>
              <span className="font-semibold">Call:</span>{" "}
              <a href="tel:+17808841244" className="font-semibold hover:text-blue-900">
                780-884-1244
              </a>
            </p>
          </div>
        </div>
        <div className="max-w-md rounded-2xl border bg-background p-8 shadow-sm">
          <MapPin aria-hidden="true" className="size-8 text-primary" />
          <h2 className="mt-5 text-2xl font-bold">Crosen office location</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            View the location and get directions in Google Maps.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border">
            <iframe
              src={mapEmbedUrl}
              title="Crosen office location map"
              className="h-48 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <Button asChild className="mt-6 h-12">
            <a href={mapUrl} target="_blank" rel="noopener noreferrer">
              Open in Google Maps <ArrowUpRight />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
