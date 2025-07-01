'use client';

import { useState } from 'react';
// import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockInterns } from '@/data/mockInterns';
import { X, Users, User } from 'lucide-react';
import { sendWhatsAppNotification, createWorkflowTaskMessage } from '@/lib/whatsapp';

interface WorkflowStage {
  id: string;
  name: string;
  order: number;
  assignedInterns: string[];
  description: string;
  estimatedDuration: string;
}

const initialStages: WorkflowStage[] = [
  { id: '1', name: 'Job Posting', order: 1, assignedInterns: [], description: 'Create and post job listings', estimatedDuration: '2-3 hours' },
  { id: '2', name: 'Interview Scheduling', order: 2, assignedInterns: [], description: 'Schedule interviews with candidates', estimatedDuration: '1-2 hours' },
  { id: '3', name: 'Recording Upload', order: 3, assignedInterns: [], description: 'Upload interview recordings', estimatedDuration: '30 minutes' },
  { id: '4', name: 'Selection', order: 4, assignedInterns: [], description: 'Review and select candidates', estimatedDuration: '1-2 hours' },
  { id: '5', name: 'Profile Creation', order: 5, assignedInterns: [], description: 'Create profiles for selected candidates', estimatedDuration: '1 hour' },
  { id: '6', name: 'Documentation', order: 6, assignedInterns: [], description: 'Upload required documents', estimatedDuration: '30 minutes' },
  { id: '7', name: 'Letter Generation', order: 7, assignedInterns: [], description: 'Generate offer letters', estimatedDuration: '1 hour' },
  { id: '8', name: 'Slack Invite', order: 8, assignedInterns: [], description: 'Send Slack invitations', estimatedDuration: '15 minutes' }
];

export function HRFlowAssignment() {
  const [stages, setStages] = useState<WorkflowStage[]>(initialStages);
  const [viewMode, setViewMode] = useState<'task' | 'intern'>('task');

  const toggleInternAssignment = async (stageId: string, internId: string) => {
    const stage = stages.find(s => s.id === stageId);
    const intern = mockInterns.find(i => i.id === internId);
    
    if (stage && intern && !stage.assignedInterns.includes(internId)) {
      // Send WhatsApp notification for new assignment
      const message = createWorkflowTaskMessage(stage.name, intern.name);
      await sendWhatsAppNotification({
        to: intern.phone,
        message,
        type: 'workflow_task'
      });
    }
    
    setStages(prev => prev.map(stage => 
      stage.id === stageId 
        ? {
            ...stage,
            assignedInterns: stage.assignedInterns.includes(internId)
              ? stage.assignedInterns.filter(id => id !== internId)
              : [...stage.assignedInterns, internId]
          }
        : stage
    ));
  };

  const removeIntern = (stageId: string, internId: string) => {
    setStages(prev => prev.map(stage => 
      stage.id === stageId 
        ? { ...stage, assignedInterns: stage.assignedInterns.filter(id => id !== internId) }
        : stage
    ));
  };

  const getInternName = (internId: string) => mockInterns.find(i => i.id === internId)?.name || '';

  const getInternAssignments = (internId: string) => {
    return stages.filter(stage => stage.assignedInterns.includes(internId));
  };

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-blue-800">HR Workflow Assignment</CardTitle>
          <div className="flex items-center justify-between mt-2">
            <p className="text-blue-600">Assign interns to workflow stages</p>
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('task')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all cursor-pointer ${
                  viewMode === 'task' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                <Users className="h-4 w-4 inline mr-1" />Task View
              </button>
              <button
                onClick={() => setViewMode('intern')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all cursor-pointer ${
                  viewMode === 'intern' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                <User className="h-4 w-4 inline mr-1" />Intern View
              </button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {viewMode === 'task' ? (
        <div className="space-y-4">
          {stages.map((stage) => (
            <Card key={stage.id} className="border-l-4 border-l-gray-300">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{stage.order}. {stage.name}</h3>
                    <p className="text-sm text-gray-600">{stage.description}</p>
                    <p className="text-xs text-blue-600 mt-1">⏱️ {stage.estimatedDuration}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {stage.assignedInterns.map(internId => (
                      <span key={internId} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {getInternName(internId)}
                        <button
                          onClick={() => removeIntern(stage.id, internId)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {mockInterns.map(intern => (
                      <label key={intern.id} className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={stage.assignedInterns.includes(intern.id)}
                          onChange={() => toggleInternAssignment(stage.id, intern.id)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{intern.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {mockInterns.map(intern => {
            const assignments = getInternAssignments(intern.id);
            return (
              <Card key={intern.id} className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{intern.name}</h3>
                      <p className="text-sm text-gray-600">{intern.department}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {assignments.length} tasks
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {assignments.map(stage => (
                      <span key={stage.id} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {stage.name}
                      </span>
                    ))}
                    {assignments.length === 0 && (
                      <span className="text-gray-500 text-sm">No assignments</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}