'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { mockInterns } from '@/data/mockInterns';
import { Intern } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Search, Filter, Download, Eye, Edit, UserX } from 'lucide-react';

export function InternProfilesDashboard() {
  const [interns, setInterns] = useState<Intern[]>(mockInterns);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  const filteredInterns = interns.filter(intern => {
    const matchesSearch = intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intern.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || intern.onboardingStatus === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || intern.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const departments = [...new Set(interns.map(intern => intern.department))];

  const handleExport = () => {
    console.log('Exporting intern data...');
    alert('Export functionality would be implemented here');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>All Intern Profiles Dashboard</CardTitle>
          <p className="text-purplerain-text-secondary">
            Comprehensive view of all intern progress and status
          </p>
        </CardHeader>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purplerain-text-secondary" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-purplerain-border rounded-md focus:outline-none focus:ring-2 focus:ring-purplerain-primary"
                />
              </div>
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-purplerain-border rounded-md focus:outline-none focus:ring-2 focus:ring-purplerain-primary"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 border border-purplerain-border rounded-md focus:outline-none focus:ring-2 focus:ring-purplerain-primary"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <Button onClick={handleExport} variant="secondary" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="text-sm text-purplerain-text-secondary">
        Showing {filteredInterns.length} of {interns.length} interns
      </div>

      {/* Intern Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purplerain-bg border-b border-purplerain-border">
                <tr>
                  <th className="text-left p-4 font-medium text-purplerain-text-primary">Intern</th>
                  <th className="text-left p-4 font-medium text-purplerain-text-primary">Department</th>
                  <th className="text-left p-4 font-medium text-purplerain-text-primary">Status</th>
                  <th className="text-left p-4 font-medium text-purplerain-text-primary">Documents</th>
                  <th className="text-left p-4 font-medium text-purplerain-text-primary">Slack</th>
                  <th className="text-left p-4 font-medium text-purplerain-text-primary">Join Date</th>
                  <th className="text-left p-4 font-medium text-purplerain-text-primary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInterns.map(intern => (
                  <tr key={intern.id} className="border-b border-purplerain-border hover:bg-purplerain-bg/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-purplerain-text-primary">{intern.name}</div>
                        <div className="text-sm text-purplerain-text-secondary">{intern.email}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-purplerain-bg text-purplerain-text-primary rounded text-sm">
                        {intern.department}
                      </span>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={intern.onboardingStatus} />
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-1">
                        {intern.documents.resume && (
                          <span className="w-2 h-2 bg-green-500 rounded-full" title="Resume uploaded" />
                        )}
                        {intern.documents.idProof && (
                          <span className="w-2 h-2 bg-green-500 rounded-full" title="ID Proof uploaded" />
                        )}
                        {intern.documents.agreement && (
                          <span className="w-2 h-2 bg-green-500 rounded-full" title="Agreement uploaded" />
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={intern.slackStatus} />
                    </td>
                    <td className="p-4 text-sm text-purplerain-text-secondary">
                      {formatDate(intern.joinDate)}
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <UserX className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}