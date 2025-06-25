import { AdminLayout } from '@/components/layout/AdminLayout';
import { InternProfilesDashboard } from '@/components/admin/InternProfilesDashboard';

export default function InternProfilesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-purplerain-text-primary">Intern Profiles</h1>
          <p className="text-purplerain-text-secondary">
            Comprehensive dashboard for managing all intern profiles and progress
          </p>
        </div>
        <InternProfilesDashboard />
      </div>
    </AdminLayout>
  );
}