export interface Intern {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  onboardingStatus: 'Pending' | 'In Progress' | 'Completed';
  assignedTasks: Task[];
  documents: {
    idProof?: string;
    agreement?: string;
    resume?: string;
  };
  interviewRecording?: string;
  slackStatus: 'Not Sent' | 'Sent' | 'Joined';
  joinDate: Date;
  lastActivity: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  assignedTo: string;
  dueDate: Date;
}

export interface JobPost {
  id: string;
  title: string;
  description: string;
  platforms: string[];
  country: string;
  assignedInterns: string[];
  status: 'Draft' | 'Posted' | 'Closed';
  createdAt: Date;
  postedAt?: Date;
}

export interface Department {
  id: string;
  name: string;
  monitor?: string;
  internCount: number;
  activeProjects: number;
  description: string;
}

export interface WorkflowStage {
  id: string;
  name: string;
  order: number;
  assignedIntern?: string;
  description: string;
  estimatedDuration: string;
}