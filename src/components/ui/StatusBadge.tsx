
import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'active' | 'warning' | 'inactive' | 'paid' | 'due' | 'overdue';
  text: string;
  className?: string;
}

const StatusBadge = ({ status, text, className }: StatusBadgeProps) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'warning':
      case 'due':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'inactive':
      case 'overdue':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      getStatusStyles(status),
      className
    )}>
      {text}
    </span>
  );
};

export default StatusBadge;
