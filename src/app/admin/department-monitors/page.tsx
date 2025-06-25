import { AdminLayout } from '@/components/layout/AdminLayout';
import { DepartmentMonitor } from '@/components/admin/DepartmentMonitor';

export default function DepartmentMonitorsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-purplerain-text-primary">Department Monitors</h1>
          <p className="text-purplerain-text-secondary">
            Assign and manage department monitors for each team
          </p>
        </div>
        <DepartmentMonitor />
      </div>
    </AdminLayout>
  );
}