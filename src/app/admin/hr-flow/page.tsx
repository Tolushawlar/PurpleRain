import { AdminLayout } from '@/components/layout/AdminLayout';
import { HRFlowAssignment } from '@/components/admin/HRFlowAssignment';

export default function HRFlowPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-purplerain-text-primary">HR Flow Assignment</h1>
          <p className="text-purplerain-text-secondary">
            Configure workflow stages and assign interns to each step
          </p>
        </div>
        <HRFlowAssignment />
      </div>
    </AdminLayout>
  );
}