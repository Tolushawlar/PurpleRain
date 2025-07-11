import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'Pending' | 'In Progress' | 'Completed' | 'Draft' | 'Posted' | 'Closed' | 'Not Sent' | 'Sent' | 'Joined' | 'Uploaded' | 'Missing';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Posted':
      case 'Joined':
      case 'Uploaded':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
      case 'Sent':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending':
      case 'Draft':
      case 'Not Sent':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Missing':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border',
        getStatusStyles(status),
        className
      )}
    >
      {status}
    </span>
  );
}