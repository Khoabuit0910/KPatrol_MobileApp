'use client';

import { 
  LayoutDashboard, 
  Gamepad2, 
  Video, 
  History, 
  Settings,
  X,
  Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewType = 'dashboard' | 'control' | 'camera' | 'history' | 'settings';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'dashboard' as ViewType, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'control' as ViewType, label: 'Điều khiển', icon: Gamepad2 },
  { id: 'camera' as ViewType, label: 'Camera', icon: Video },
  { id: 'history' as ViewType, label: 'Lịch sử', icon: History },
  { id: 'settings' as ViewType, label: 'Cài đặt', icon: Settings },
];

export function Sidebar({ currentView, onViewChange, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:static inset-y-0 left-0 z-50",
        "w-64 bg-dark-card border-r border-dark-border",
        "transform transition-transform duration-300 ease-in-out",
        "md:transform-none",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-dark-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-kpatrol-500/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-kpatrol-500" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-white">K-Patrol</h1>
              <p className="text-xs text-dark-muted">Control Center</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="md:hidden p-2 hover:bg-dark-border rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onViewChange(item.id);
                onClose();
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg",
                "transition-all duration-200",
                currentView === item.id
                  ? "bg-kpatrol-500/20 text-kpatrol-400 border border-kpatrol-500/30"
                  : "text-dark-muted hover:bg-dark-border hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Robot Status */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-border">
          <div className="card-glow p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-kpatrol-500/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-kpatrol-500" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 status-dot online" />
              </div>
              <div>
                <p className="font-medium text-white text-sm">Robot-01</p>
                <p className="text-xs text-status-online">Đang hoạt động</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
