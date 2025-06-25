import { WorkflowStage } from '@/lib/types';

export const mockWorkflowStages: WorkflowStage[] = [
  {
    id: '1',
    name: 'Job Posting',
    order: 1,
    assignedIntern: 'Alice Johnson',
    description: 'Create and post job listings on various platforms',
    estimatedDuration: '2-3 hours'
  },
  {
    id: '2',
    name: 'Interview Scheduling',
    order: 2,
    assignedIntern: 'Bob Smith',
    description: 'Schedule interviews with candidates',
    estimatedDuration: '1-2 hours'
  },
  {
    id: '3',
    name: 'Recording Upload',
    order: 3,
    assignedIntern: 'Carol Davis',
    description: 'Upload and organize interview recordings',
    estimatedDuration: '30 minutes'
  },
  {
    id: '4',
    name: 'Selection',
    order: 4,
    description: 'Review candidates and make selection decisions',
    estimatedDuration: '1-2 hours'
  },
  {
    id: '5',
    name: 'Profile Creation',
    order: 5,
    assignedIntern: 'David Brown',
    description: 'Create profiles for selected candidates',
    estimatedDuration: '1 hour'
  },
  {
    id: '6',
    name: 'Documentation Upload',
    order: 6,
    assignedIntern: 'Eva Green',
    description: 'Upload required documents and agreements',
    estimatedDuration: '30 minutes'
  },
  {
    id: '7',
    name: 'Letter Generation',
    order: 7,
    assignedIntern: 'Frank White',
    description: 'Generate offer letters and contracts',
    estimatedDuration: '1 hour'
  },
  {
    id: '8',
    name: 'Slack Invitation',
    order: 8,
    assignedIntern: 'Grace Black',
    description: 'Send Slack invitations to new hires',
    estimatedDuration: '15 minutes'
  }
];