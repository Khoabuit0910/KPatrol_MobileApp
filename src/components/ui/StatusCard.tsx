'use client';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  status: 'success' | 'warning' | 'danger' | 'info';
  progress?: number;
}

const statusColors = {
  success: 'text-status-online',
  warning: 'text-status-warning',
  danger: 'text-status-offline',
  info: 'text-kpatrol-400',
};

const progressColors = {
  success: 'bg-status-online',
  warning: 'bg-status-warning',
  danger: 'bg-status-offline',
  info: 'bg-kpatrol-500',
};

export function StatusCard({ icon: Icon, label, value, status, progress }: StatusCardProps) {
  return (
    <div className="card-glow p-4">
      <div className="flex items-center gap-3 mb-2">
        <Icon className={cn('w-5 h-5', statusColors[status])} />
        <span className="text-sm text-dark-muted">{label}</span>
      </div>
      <p className={cn('text-2xl font-bold', statusColors[status])}>{value}</p>
      
      {progress !== undefined && (
        <div className="mt-3 h-1.5 bg-dark-border rounded-full overflow-hidden">
          <div 
            className={cn('h-full rounded-full transition-all duration-500', progressColors[status])}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
