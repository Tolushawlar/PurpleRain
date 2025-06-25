'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Briefcase, 
  GitBranch, 
  Users, 
  UserCheck 
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Job Assignment', href: '/admin/job-assignment', icon: Briefcase },
  { name: 'HR Flow', href: '/admin/hr-flow', icon: GitBranch },
  { name: 'Department Monitors', href: '/admin/department-monitors', icon: Users },
  { name: 'Intern Profiles', href: '/admin/intern-profiles', icon: UserCheck },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-purplerain-card border-r border-purplerain-border">
      <div className="flex h-16 items-center px-6 border-b border-purplerain-border">
        <h1 className="text-xl font-bold text-purplerain-primary">Purplerain HR</h1>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-purplerain-primary text-white'
                  : 'text-purplerain-text-secondary hover:bg-purplerain-bg hover:text-purplerain-text-primary'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive ? 'text-white' : 'text-purplerain-text-secondary'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}