import { AdminLayout } from '@/components/layout/AdminLayout';
import { JobPostAssignment } from '@/components/admin/JobPostAssignment';

export default function JobAssignmentPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-purplerain-text-primary">Job Post Assignment</h1>
          <p className="text-purplerain-text-secondary">
            Create and assign job posting tasks to HR interns
          </p>
        </div>
        <JobPostAssignment />
      </div>
    </AdminLayout>
  );
}