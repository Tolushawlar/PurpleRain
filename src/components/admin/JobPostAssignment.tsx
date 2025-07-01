'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { mockInterns } from '@/data/mockInterns';
import { Upload, MessageSquare, Clock, CheckCircle, Download } from 'lucide-react';
import { sendWhatsAppNotification, createJobAssignmentMessage } from '@/lib/whatsapp';

interface JobTask {
  id: string;
  title: string;
  description: string;
  platforms: string[];
  country: string;
  assignedInterns: string[];
  createdAt: Date;
  tasks: TaskItem[];
  whatsappAlert: boolean;
}

interface TaskItem {
  id: string;
  internId: string;
  internName: string;
  status: 'Pending' | 'Completed';
  evidence?: string;
  submittedAt?: Date;
}

const platforms = ['LinkedIn', 'Internshala', 'Indeed', 'AngelList', 'Glassdoor'];
const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'India'];

export function JobPostAssignment() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    platforms: [] as string[],
    country: '',
    assignedInterns: [] as string[],
    whatsappAlert: true
  });
  
  const [jobTasks, setJobTasks] = useState<JobTask[]>([]);
  const [activeTab, setActiveTab] = useState<'form' | 'tracker'>('form');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: JobTask = {
      id: Date.now().toString(),
      ...form,
      createdAt: new Date(),
      tasks: form.assignedInterns.map(internId => ({
        id: `${Date.now()}-${internId}`,
        internId,
        internName: mockInterns.find(i => i.id === internId)?.name || '',
        status: 'Pending' as const
      }))
    };
    setJobTasks(prev => [newTask, ...prev]);
    
    // Send WhatsApp notifications if enabled
    if (form.whatsappAlert) {
      const internNames = form.assignedInterns.map(id => 
        mockInterns.find(i => i.id === id)?.name || ''
      ).filter(Boolean);
      
      const message = createJobAssignmentMessage(form.title, internNames);
      
      for (const internId of form.assignedInterns) {
        const intern = mockInterns.find(i => i.id === internId);
        if (intern) {
          await sendWhatsAppNotification({
            to: intern.phone,
            message,
            type: 'job_assignment'
          });
        }
      }
    }
    
    setForm({ title: '', description: '', platforms: [], country: '', assignedInterns: [], whatsappAlert: true });
    setActiveTab('tracker');
  };

  const updateTaskStatus = (taskId: string, evidence: string) => {
    setJobTasks(prev => prev.map(job => ({
      ...job,
      tasks: job.tasks.map(task => 
        task.id === taskId 
          ? { ...task, status: 'Completed' as const, evidence, submittedAt: new Date() }
          : task
      )
    })));
  };

  const exportJobTracker = () => {
    const csvContent = jobTasks.flatMap(job => 
      job.tasks.map(task => 
        `${job.title},${task.internName},${task.status},${task.submittedAt?.toLocaleDateString() || 'N/A'},${task.evidence || 'N/A'}`
      )
    ).join('\n');
    const blob = new Blob([`Job Title,Intern Name,Status,Submitted Date,Evidence\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'job-tracker.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('form')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'form' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Job Assignment Form
        </button>
        <button
          onClick={() => setActiveTab('tracker')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'tracker' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Job Task Tracker ({jobTasks.length})
        </button>
      </div>

      {activeTab === 'form' && (
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-blue-800">Create Job Assignment</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Job Description *</label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Platforms *</label>
                <div className="grid grid-cols-3 gap-2">
                  {platforms.map(platform => (
                    <label key={platform} className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={form.platforms.includes(platform)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setForm(prev => ({ ...prev, platforms: [...prev.platforms, platform] }));
                          } else {
                            setForm(prev => ({ ...prev, platforms: prev.platforms.filter(p => p !== platform) }));
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country *</label>
                <select
                  required
                  value={form.country}
                  onChange={(e) => setForm(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Assign to HR Intern(s) *</label>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {mockInterns.map(intern => (
                    <label key={intern.id} className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={form.assignedInterns.includes(intern.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setForm(prev => ({ ...prev, assignedInterns: [...prev.assignedInterns, intern.id] }));
                          } else {
                            setForm(prev => ({ ...prev, assignedInterns: prev.assignedInterns.filter(id => id !== intern.id) }));
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{intern.name} - {intern.department}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="whatsapp"
                  checked={form.whatsappAlert}
                  onChange={(e) => setForm(prev => ({ ...prev, whatsappAlert: e.target.checked }))}
                  className="w-4 h-4"
                />
                <label htmlFor="whatsapp" className="text-sm flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                  <span>Send WhatsApp Alert</span>
                </label>
              </div>
              <Button type="submit" className="w-full">Create Job Assignment</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === 'tracker' && (
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex justify-between items-center">
              <CardTitle className="text-green-800">Job Task Tracker</CardTitle>
              {jobTasks.length > 0 && (
                <Button onClick={exportJobTracker} variant="secondary" size="sm" className="flex items-center space-x-1">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {jobTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No job assignments yet. Create one to get started.</p>
            ) : (
              <div className="space-y-4">
                {jobTasks.map(job => (
                  <div key={job.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.platforms.join(', ')} • {job.country}</p>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {job.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                      {job.whatsappAlert && (
                        <span title="WhatsApp alerts enabled">
                          <MessageSquare className="h-5 w-5 text-green-600" />
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      {job.tasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div className="flex items-center space-x-3">
                            <StatusBadge status={task.status} />
                            <span className="font-medium">{task.internName}</span>
                            {task.submittedAt && (
                              <span className="text-xs text-gray-500">
                                Submitted: {task.submittedAt.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            {task.evidence && (
                              <a href={task.evidence} target="_blank" rel="noopener noreferrer" 
                                 className="text-blue-600 hover:text-blue-800">
                                <Upload className="h-4 w-4" />
                              </a>
                            )}
                            {task.status === 'Pending' && (
                              <Button
                                size="sm"
                                onClick={() => {
                                  const evidence = prompt('Enter evidence URL or description:');
                                  if (evidence) updateTaskStatus(task.id, evidence);
                                }}
                              >
                                Mark Complete
                              </Button>
                            )}
                            {task.status === 'Completed' && (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}