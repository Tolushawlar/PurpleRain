'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { mockDepartments } from '@/data/mockDepartments';
import { mockInterns } from '@/data/mockInterns';
import { Department } from '@/lib/types';
import { Users, FileText, Star, Clock, MessageSquare, CheckCircle, XCircle, Download } from 'lucide-react';

interface DepartmentActivity extends Department {
  weeklyReportStatus: 'Uploaded' | 'Missing';
  feedback: string;
  rating: number;
  lastReportDate: Date;
}

const initialDepartmentActivities: DepartmentActivity[] = mockDepartments.map(dept => ({
  ...dept,
  weeklyReportStatus: Math.random() > 0.5 ? 'Uploaded' : 'Missing',
  feedback: ['Great progress this week', 'Need improvement in communication', 'Excellent team coordination', 'On track with all deliverables'][Math.floor(Math.random() * 4)],
  rating: Math.floor(Math.random() * 5) + 1,
  lastReportDate: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000)
}));

export function DepartmentMonitor() {
  const [departments, setDepartments] = useState<DepartmentActivity[]>(initialDepartmentActivities);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const handleAssignMonitor = (deptId: string, monitor: string) => {
    setDepartments(prev => prev.map(dept => 
      dept.id === deptId 
        ? { ...dept, monitor: monitor || undefined }
        : dept
    ));
    setSelectedDept(null);
  };

  const updateRating = (deptId: string, rating: number) => {
    setDepartments(prev => prev.map(dept => 
      dept.id === deptId ? { ...dept, rating } : dept
    ));
  };

  const sendWhatsAppNotification = (deptName: string, monitorName: string) => {
    alert(`WhatsApp notification sent to ${monitorName} (${deptName} monitor):\n\n"Weekly report reminder: Please submit your department activity report."`); 
  };

  const exportWeeklyFeedback = () => {
    const csvContent = departments.map(dept => 
      `${dept.name},${dept.monitor || 'Unassigned'},${dept.weeklyReportStatus},${dept.rating},${dept.feedback},${dept.lastReportDate.toLocaleDateString()}`
    ).join('\n');
    const blob = new Blob([`Department,Monitor,Report Status,Rating,Feedback,Last Report Date\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weekly-feedback-report.csv';
    a.click();
  };

  const renderStars = (deptId: string, currentRating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        onClick={() => updateRating(deptId, i + 1)}
        className={`text-lg ${i < currentRating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
      >
        <Star className="h-4 w-4 fill-current" />
      </button>
    ));
  };

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-blue-800">Department Activity Monitor</CardTitle>
              <p className="text-blue-600">Track department performance and weekly reports</p>
            </div>
            <Button onClick={exportWeeklyFeedback} variant="secondary" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Reports</span>
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold">Department</th>
                  <th className="text-left p-4 font-semibold">HR Monitor</th>
                  <th className="text-left p-4 font-semibold">Weekly Report</th>
                  <th className="text-left p-4 font-semibold">Feedback</th>
                  <th className="text-left p-4 font-semibold">Rating</th>
                  <th className="text-left p-4 font-semibold">Last Report</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept, index) => (
                  <tr key={dept.id} className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-semibold">{dept.name}</div>
                          <div className="text-sm text-gray-600">{dept.internCount} interns</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {dept.monitor ? (
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{dept.monitor}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedDept(dept.id)}
                            className="text-xs"
                          >
                            Change
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => setSelectedDept(dept.id)}
                        >
                          Assign
                        </Button>
                      )}
                      {selectedDept === dept.id && (
                        <div className="absolute z-10 mt-2 w-64 bg-white border rounded-lg shadow-lg p-3">
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {mockInterns.map(intern => (
                              <button
                                key={intern.id}
                                onClick={() => handleAssignMonitor(dept.id, intern.name)}
                                className="w-full text-left px-2 py-1 text-sm border rounded hover:bg-gray-50"
                              >
                                {intern.name}
                              </button>
                            ))}
                          </div>
                          <Button size="sm" variant="ghost" onClick={() => setSelectedDept(null)} className="mt-2">
                            Cancel
                          </Button>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {dept.weeklyReportStatus === 'Uploaded' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        <StatusBadge status={dept.weeklyReportStatus} />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-700 truncate" title={dept.feedback}>
                          {dept.feedback}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        {renderStars(dept.id, dept.rating)}
                        <span className="ml-2 text-sm text-gray-600">({dept.rating}/5)</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{dept.lastReportDate.toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => dept.monitor && sendWhatsAppNotification(dept.name, dept.monitor)}
                          disabled={!dept.monitor}
                          className="text-green-600 hover:bg-green-50"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-blue-600 hover:bg-blue-50">
                          <FileText className="h-4 w-4" />
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