import { Intern } from '@/lib/types';

export const mockInterns: Intern[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1234567890',
    department: 'Development',
    onboardingStatus: 'In Progress',
    assignedTasks: [],
    documents: {
      resume: 'alice_resume.pdf',
      idProof: 'alice_id.pdf'
    },
    slackStatus: 'Sent',
    joinDate: new Date('2024-01-15'),
    lastActivity: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    phone: '+1234567891',
    department: 'Design',
    onboardingStatus: 'Completed',
    assignedTasks: [],
    documents: {
      resume: 'bob_resume.pdf',
      idProof: 'bob_id.pdf',
      agreement: 'bob_agreement.pdf'
    },
    slackStatus: 'Joined',
    joinDate: new Date('2024-01-10'),
    lastActivity: new Date('2024-01-21')
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    phone: '+1234567892',
    department: 'Marketing',
    onboardingStatus: 'Pending',
    assignedTasks: [],
    documents: {},
    slackStatus: 'Not Sent',
    joinDate: new Date('2024-01-22'),
    lastActivity: new Date('2024-01-22')
  }
];