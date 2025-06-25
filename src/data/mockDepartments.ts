import { Department } from '@/lib/types';

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Social Media',
    monitor: 'John Doe',
    internCount: 5,
    activeProjects: 3,
    description: 'Managing social media presence and content creation'
  },
  {
    id: '2',
    name: 'Development',
    monitor: 'Jane Smith',
    internCount: 8,
    activeProjects: 5,
    description: 'Software development and technical projects'
  },
  {
    id: '3',
    name: 'Design',
    internCount: 4,
    activeProjects: 2,
    description: 'UI/UX design and visual content creation'
  },
  {
    id: '4',
    name: 'Marketing',
    monitor: 'Mike Johnson',
    internCount: 6,
    activeProjects: 4,
    description: 'Marketing campaigns and strategy'
  },
  {
    id: '5',
    name: 'Content',
    internCount: 3,
    activeProjects: 2,
    description: 'Content creation and copywriting'
  },
  {
    id: '6',
    name: 'Operations',
    monitor: 'Sarah Wilson',
    internCount: 4,
    activeProjects: 3,
    description: 'Business operations and process management'
  }
];