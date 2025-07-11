import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Users, Briefcase, GitBranch, UserCheck } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Interns', value: '24', icon: Users, color: 'text-blue-600' },
    { title: 'Active Jobs', value: '8', icon: Briefcase, color: 'text-green-600' },
    { title: 'Workflow Stages', value: '8', icon: GitBranch, color: 'text-purple-600' },
    { title: 'Completed Onboarding', value: '18', icon: UserCheck, color: 'text-orange-600' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-purplerain-text-primary">Admin Dashboard</h1>
          <p className="text-purplerain-text-secondary">
            Welcome to the Purplerain HR CRM Admin Panel
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const gradients = [
              'bg-gradient-to-br from-blue-500 to-blue-600',
              'bg-gradient-to-br from-green-500 to-green-600', 
              'bg-gradient-to-br from-purple-500 to-purple-600',
              'bg-gradient-to-br from-orange-500 to-orange-600'
            ];
            return (
              <Card key={stat.title} className="overflow-hidden">
                <CardContent className="p-0 text-red-500">
                  <div className={`${gradients[index]} p-6 text-black`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-black/90">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold text-black mt-2">
                          {stat.value}
                        </p>
                      </div>
                      <stat.icon className="h-12 w-12 text-black/80" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New intern onboarded</p>
                    <p className="text-xs text-purplerain-text-secondary">Alice Johnson - Development</p>
                  </div>
                  <span className="text-xs text-purplerain-text-secondary">2h ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Job posted on LinkedIn</p>
                    <p className="text-xs text-purplerain-text-secondary">Frontend Developer position</p>
                  </div>
                  <span className="text-xs text-purplerain-text-secondary">4h ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Workflow updated</p>
                    <p className="text-xs text-purplerain-text-secondary">HR Flow assignments modified</p>
                  </div>
                  <span className="text-xs text-purplerain-text-secondary">6h ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Department Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Development</span>
                  <span className="text-sm text-purplerain-text-secondary">8 interns</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Design</span>
                  <span className="text-sm text-purplerain-text-secondary">4 interns</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Marketing</span>
                  <span className="text-sm text-purplerain-text-secondary">6 interns</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Social Media</span>
                  <span className="text-sm text-purplerain-text-secondary">5 interns</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}