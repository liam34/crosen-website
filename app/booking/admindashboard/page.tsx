import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Booking Admin",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const authenticated = await isAdminAuthenticated();

  return (
    <section className="min-h-[65vh] bg-secondary px-6 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <AdminDashboard initialAuthenticated={authenticated} />
      </div>
    </section>
  );
}
