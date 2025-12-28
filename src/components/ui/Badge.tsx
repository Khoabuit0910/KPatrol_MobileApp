'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const variants = {
      default: 'bg-dark-card text-dark-muted border-dark-border',
      primary: 'bg-kpatrol-500/20 text-kpatrol-400 border-kpatrol-500/30',
      success: 'bg-status-online/20 text-status-online border-status-online/30',
      warning: 'bg-status-warning/20 text-status-warning border-status-warning/30',
      danger: 'bg-status-offline/20 text-status-offline border-status-offline/30',
      outline: 'bg-transparent text-dark-text border-dark-border',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-xs',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 rounded-full font-medium border',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

// Status Badge with dot indicator
export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: 'online' | 'offline' | 'warning' | 'charging' | 'busy' | 'maintenance';
  showDot?: boolean;
}

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, status, showDot = true, children, ...props }, ref) => {
    const statusConfig = {
      online: {
        bg: 'bg-status-online/20',
        text: 'text-status-online',
        border: 'border-status-online/30',
        dot: 'bg-status-online',
        label: 'Trực tuyến',
      },
      offline: {
        bg: 'bg-status-offline/20',
        text: 'text-status-offline',
        border: 'border-status-offline/30',
        dot: 'bg-status-offline',
        label: 'Ngoại tuyến',
      },
      warning: {
        bg: 'bg-status-warning/20',
        text: 'text-status-warning',
        border: 'border-status-warning/30',
        dot: 'bg-status-warning',
        label: 'Cảnh báo',
      },
      charging: {
        bg: 'bg-status-charging/20',
        text: 'text-status-charging',
        border: 'border-status-charging/30',
        dot: 'bg-status-charging animate-pulse',
        label: 'Đang sạc',
      },
      busy: {
        bg: 'bg-status-busy/20',
        text: 'text-status-busy',
        border: 'border-status-busy/30',
        dot: 'bg-status-busy',
        label: 'Đang bận',
      },
      maintenance: {
        bg: 'bg-status-maintenance/20',
        text: 'text-status-maintenance',
        border: 'border-status-maintenance/30',
        dot: 'bg-status-maintenance',
        label: 'Bảo trì',
      },
    };

    const config = statusConfig[status];

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
          config.bg,
          config.text,
          config.border,
          className
        )}
        {...props}
      >
        {showDot && (
          <span className={cn('w-1.5 h-1.5 rounded-full', config.dot)} />
        )}
        {children || config.label}
      </span>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';
