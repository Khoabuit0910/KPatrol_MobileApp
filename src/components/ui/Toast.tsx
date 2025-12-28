'use client';

import { useEffect, useState, createContext, useContext, ReactNode, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in
    requestAnimationFrame(() => setIsVisible(true));

    // Auto dismiss
    const duration = toast.duration || 5000;
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 200);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      bg: 'bg-status-online/10',
      border: 'border-status-online/30',
      iconColor: 'text-status-online',
    },
    error: {
      icon: AlertCircle,
      bg: 'bg-status-offline/10',
      border: 'border-status-offline/30',
      iconColor: 'text-status-offline',
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-status-warning/10',
      border: 'border-status-warning/30',
      iconColor: 'text-status-warning',
    },
    info: {
      icon: Info,
      bg: 'bg-kpatrol-500/10',
      border: 'border-kpatrol-500/30',
      iconColor: 'text-kpatrol-400',
    },
  };

  const { icon: Icon, bg, border, iconColor } = config[toast.type];

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border backdrop-blur-sm transition-all duration-200',
        bg,
        border,
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', iconColor)} />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-dark-text">{toast.title}</p>
        {toast.message && (
          <p className="mt-1 text-sm text-dark-muted">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 200);
        }}
        className="text-dark-muted hover:text-dark-text transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Helper functions for quick toast creation
export function toast(context: ToastContextType, type: ToastType, title: string, message?: string) {
  context.addToast({ type, title, message });
}
