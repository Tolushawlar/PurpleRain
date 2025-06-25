'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockDepartments } from '@/data/mockDepartments';
import { mockInterns } from '@/data/mockInterns';
import { Department } from '@/lib/types';
import { Users, Briefcase, User } from 'lucide-react';

export function DepartmentMonitor() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const handleAssignMonitor = (deptId: string, monitor: string) => {
    setDepartments(prev => prev.map(dept => 
      dept.id === deptId 
        ? { ...dept, monitor: monitor || undefined }
        : dept
    ));
    setSelectedDept(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Department Monitor Management</CardTitle>
          <p className="text-purplerain-text-secondary">
            Assign and manage department monitors for each team
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map(dept => (
          <Card key={dept.id} className="relative">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Users className="h-5 w-5 text-purplerain-primary" />
                <span>{dept.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-purplerain-text-secondary">
                {dept.description}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{dept.internCount} Interns</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{dept.activeProjects} Projects</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Current Monitor:</p>
                    {dept.monitor ? (
                      <p className="text-sm text-purplerain-primary font-medium">
                        {dept.monitor}
                      </p>
                    ) : (
                      <p className="text-sm text-purplerain-text-secondary">
                        No monitor assigned
                      </p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setSelectedDept(dept.id)}
                  >
                    {dept.monitor ? 'Reassign' : 'Assign'}
                  </Button>
                </div>
              </div>

              {selectedDept === dept.id && (
                <div className="border-t pt-4 space-y-3">
                  <p className="text-sm font-medium">Select Monitor:</p>
                  <div className="space-y-2">
                    {mockInterns.map(intern => (
                      <button
                        key={intern.id}
                        onClick={() => handleAssignMonitor(dept.id, intern.name)}
                        className="w-full text-left px-3 py-2 text-sm border border-purplerain-border rounded hover:bg-purplerain-bg transition-colors"
                      >
                        {intern.name} - {intern.department}
                      </button>
                    ))}
                    {dept.monitor && (
                      <button
                        onClick={() => handleAssignMonitor(dept.id, '')}
                        className="w-full text-left px-3 py-2 text-sm border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors"
                      >
                        Remove Monitor
                      </button>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedDept(null)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}