'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  animated?: boolean;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value,
      max = 100,
      variant = 'default',
      size = 'md',
      showValue = false,
      animated = true,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const variants = {
      default: 'bg-gradient-to-r from-kpatrol-500 to-accent-500',
      success: 'bg-status-online',
      warning: 'bg-status-warning',
      danger: 'bg-status-offline',
    };

    const sizes = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    };

    // Auto variant based on value
    const autoVariant = (): 'success' | 'warning' | 'danger' | 'default' => {
      if (variant !== 'default') return variant;
      if (percentage >= 70) return 'success';
      if (percentage >= 30) return 'warning';
      return 'danger';
    };

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        <div className={cn('w-full bg-dark-border rounded-full overflow-hidden', sizes[size])}>
          <div
            className={cn(
              'h-full rounded-full',
              variants[autoVariant()],
              animated && 'transition-all duration-500 ease-out'
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showValue && (
          <span className="mt-1 text-xs text-dark-muted">{Math.round(percentage)}%</span>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

// Battery Progress Component
export interface BatteryProgressProps {
  value: number;
  isCharging?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
}

export function BatteryProgress({
  value,
  isCharging = false,
  size = 'md',
  showPercentage = true,
}: BatteryProgressProps) {
  const getBatteryColor = () => {
    if (isCharging) return 'bg-status-charging';
    if (value >= 60) return 'bg-status-online';
    if (value >= 20) return 'bg-status-warning';
    return 'bg-status-offline';
  };

  const sizes = {
    sm: { container: 'w-8 h-4', nub: 'w-1 h-2' },
    md: { container: 'w-12 h-6', nub: 'w-1.5 h-3' },
    lg: { container: 'w-16 h-8', nub: 'w-2 h-4' },
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <div
          className={cn(
            'relative rounded-sm border-2 border-dark-muted p-0.5',
            sizes[size].container
          )}
        >
          <div
            className={cn(
              'h-full rounded-sm transition-all duration-500',
              getBatteryColor(),
              isCharging && 'animate-pulse'
            )}
            style={{ width: `${value}%` }}
          />
        </div>
        <div
          className={cn(
            'bg-dark-muted rounded-r-sm',
            sizes[size].nub
          )}
        />
      </div>
      {showPercentage && (
        <span className={cn(
          'font-medium',
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-sm',
          size === 'lg' && 'text-base',
          value >= 60 && 'text-status-online',
          value < 60 && value >= 20 && 'text-status-warning',
          value < 20 && 'text-status-offline',
          isCharging && 'text-status-charging'
        )}>
          {value}%
        </span>
      )}
    </div>
  );
}

// Circular Progress Component
export interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  showValue?: boolean;
  label?: string;
}

export function CircularProgress({
  value,
  max = 100,
  size = 80,
  strokeWidth = 8,
  variant = 'default',
  showValue = true,
  label,
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const colors = {
    default: 'stroke-kpatrol-500',
    success: 'stroke-status-online',
    warning: 'stroke-status-warning',
    danger: 'stroke-status-offline',
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-dark-border"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(colors[variant], 'transition-all duration-500 ease-out')}
        />
      </svg>
      {(showValue || label) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {showValue && (
            <span className="text-lg font-bold text-dark-text">{Math.round(percentage)}%</span>
          )}
          {label && <span className="text-xs text-dark-muted">{label}</span>}
        </div>
      )}
    </div>
  );
}
