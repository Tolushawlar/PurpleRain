'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockWorkflowStages } from '@/data/mockWorkflow';
import { mockInterns } from '@/data/mockInterns';
import { WorkflowStage } from '@/lib/types';

export function HRFlowAssignment() {
  const [stages, setStages] = useState<WorkflowStage[]>(mockWorkflowStages);

  const handleInternAssignment = (stageId: string, internName: string) => {
    setStages(prev => prev.map(stage => 
      stage.id === stageId 
        ? { ...stage, assignedIntern: internName || undefined }
        : stage
    ));
  };

  const handleSave = () => {
    console.log('Workflow saved:', stages);
    alert('HR Flow configuration saved successfully!');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>HR Flow Assignment</CardTitle>
          <p className="text-purplerain-text-secondary">
            Assign interns to each stage of the HR workflow process
          </p>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {stages.map((stage, index) => (
          <Card key={stage.id} className="relative">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purplerain-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {stage.order}
                  </div>
                  <div>
                    <h3 className="font-medium text-purplerain-text-primary">{stage.name}</h3>
                    <p className="text-sm text-purplerain-text-secondary">{stage.description}</p>
                    <p className="text-xs text-purplerain-text-secondary mt-1">
                      Estimated: {stage.estimatedDuration}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <select
                    value={stage.assignedIntern || ''}
                    onChange={(e) => handleInternAssignment(stage.id, e.target.value)}
                    className="px-3 py-2 border border-purplerain-border rounded-md focus:outline-none focus:ring-2 focus:ring-purplerain-primary"
                  >
                    <option value="">Assign Intern</option>
                    {mockInterns.map(intern => (
                      <option key={intern.id} value={intern.name}>
                        {intern.name} - {intern.department}
                      </option>
                    ))}
                  </select>
                  
                  {stage.assignedIntern && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {stage.assignedIntern}
                    </span>
                  )}
                </div>
              </div>
              
              {index < stages.length - 1 && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-0.5 h-4 bg-purplerain-border"></div>
                  <div className="w-2 h-2 bg-purplerain-primary rounded-full -mt-1 -ml-0.5"></div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="secondary">Reset to Default</Button>
        <Button onClick={handleSave}>Save Configuration</Button>
      </div>
    </div>
  );
}