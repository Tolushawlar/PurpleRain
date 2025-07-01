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
    <div className="flex h-full w-64 flex-col bg-blue-600">
      <div className="flex h-16 items-center px-6 border-b border-white/20">
        <h1 className="text-xl font-bold text-white">Purplerain HR</h1>
      </div>
      <nav className="flex-1 space-y-2 px-4 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 transform',
                isActive
                  ? 'bg-white text-blue-600 shadow-lg scale-105 font-semibold'
                  : 'text-white hover:bg-blue-500 hover:scale-102 hover:shadow-md active:scale-95'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200',
                  isActive ? 'text-blue-600' : 'text-white group-hover:text-white'
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