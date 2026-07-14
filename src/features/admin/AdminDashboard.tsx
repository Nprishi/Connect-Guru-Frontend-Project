import { AdminAnalyticsGrid } from "@/features/admin/components/AdminAnalyticsGrid";
import { AdminDashboardHeader } from "@/features/admin/components/AdminDashboardHeader";
import { AdminPanels } from "@/features/admin/components/AdminPanels";
import { AdminStatsGrid } from "@/features/admin/components/AdminStatsGrid";
import { AdminTablesSection } from "@/features/admin/components/AdminTablesSection";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="sticky top-4 z-10">
        <AdminDashboardHeader />
      </div>

      <div className="space-y-6">
        <AdminStatsGrid />
        <AdminAnalyticsGrid />

        <div className="grid gap-6 xl:grid-cols-[0.68fr_0.32fr]">
          <div className="space-y-6">
            <AdminTablesSection />
          </div>
          <div className="space-y-6">
            <AdminPanels />
          </div>
        </div>
      </div>
    </div>
  );
}
