'use client';

import { 
  Power, 
  RotateCcw, 
  Home, 
  AlertTriangle,
  Play,
  Pause
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'danger' | 'success';
}

function ActionButton({ icon, label, onClick, variant = 'default' }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center gap-2 p-4 rounded-lg',
        'transition-all duration-200 hover:scale-105',
        variant === 'default' && 'bg-dark-bg hover:bg-dark-border text-dark-text',
        variant === 'danger' && 'bg-status-offline/20 hover:bg-status-offline/30 text-status-offline',
        variant === 'success' && 'bg-status-online/20 hover:bg-status-online/30 text-status-online',
      )}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

export function QuickActions() {
  const handleAction = (action: string) => {
    console.log('Action:', action);
    // TODO: Implement socket commands
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      <ActionButton
        icon={<Play className="w-6 h-6" />}
        label="Khởi động"
        onClick={() => handleAction('start')}
        variant="success"
      />
      <ActionButton
        icon={<Pause className="w-6 h-6" />}
        label="Tạm dừng"
        onClick={() => handleAction('pause')}
      />
      <ActionButton
        icon={<AlertTriangle className="w-6 h-6" />}
        label="Dừng khẩn"
        onClick={() => handleAction('emergency_stop')}
        variant="danger"
      />
      <ActionButton
        icon={<Home className="w-6 h-6" />}
        label="Về Home"
        onClick={() => handleAction('go_home')}
      />
      <ActionButton
        icon={<RotateCcw className="w-6 h-6" />}
        label="Reset"
        onClick={() => handleAction('reset')}
      />
      <ActionButton
        icon={<Power className="w-6 h-6" />}
        label="Tắt nguồn"
        onClick={() => handleAction('shutdown')}
        variant="danger"
      />
    </div>
  );
}
