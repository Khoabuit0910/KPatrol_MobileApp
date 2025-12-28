'use client';

import Image from 'next/image';
import { 
  LayoutDashboard, 
  Gamepad2, 
  Video, 
  History, 
  Settings,
  X,
  Bot,
  ChevronDown,
  Wifi,
  Battery,
  ThermometerSun,
  Activity,
  Zap,
  HelpCircle,
  Shield,
  Moon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRobotStore } from '@/store/robotStore';
import { useState } from 'react';
import { Progress } from '@/components/ui/Progress';

type ViewType = 'dashboard' | 'control' | 'camera' | 'history' | 'settings';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'dashboard' as ViewType, label: 'Dashboard', icon: LayoutDashboard, badge: null },
  { id: 'control' as ViewType, label: 'Điều khiển', icon: Gamepad2, badge: null },
  { id: 'camera' as ViewType, label: 'Camera', icon: Video, badge: 'LIVE' },
  { id: 'history' as ViewType, label: 'Lịch sử', icon: History, badge: '3' },
  { id: 'settings' as ViewType, label: 'Cài đặt', icon: Settings, badge: null },
];

const quickActions = [
  { label: 'Tuần tra tự động', icon: Shield, active: false },
  { label: 'Chế độ tiết kiệm', icon: Zap, active: true },
  { label: 'Chế độ đêm', icon: Moon, active: false },
];

export function Sidebar({ currentView, onViewChange, isOpen, onClose }: SidebarProps) {
  const { isConnected, batteryLevel, temperature } = useRobotStore();
  const [showRobotDetails, setShowRobotDetails] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:static inset-y-0 left-0 z-50",
        "w-72 bg-dark-card/95 backdrop-blur-lg border-r border-dark-border",
        "transform transition-transform duration-300 ease-in-out",
        "md:transform-none flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-dark-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-dark-surface flex items-center justify-center shadow-glow-sm">
              <Image 
                src="/logo.png" 
                alt="K-Patrol Logo" 
                width={40} 
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gradient">K-Patrol</h1>
              <p className="text-xs text-dark-muted">Control Center v1.0</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="md:hidden p-2 hover:bg-dark-surface rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-dark-text" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          <p className="text-xs font-semibold text-dark-muted uppercase tracking-wider mb-3 px-3">
            Menu chính
          </p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onViewChange(item.id);
                onClose();
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl",
                "transition-all duration-200 group relative",
                currentView === item.id
                  ? "bg-gradient-to-r from-kpatrol-500/20 to-kpatrol-600/10 text-kpatrol-400 shadow-inner-glow"
                  : "text-dark-muted hover:bg-dark-surface hover:text-white"
              )}
            >
              {currentView === item.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-kpatrol-500 rounded-r-full shadow-glow-sm" />
              )}
              <item.icon className={cn(
                "w-5 h-5 transition-transform",
                currentView === item.id ? "text-kpatrol-400" : "group-hover:scale-110"
              )} />
              <span className="font-medium flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-bold",
                  item.badge === 'LIVE' 
                    ? "bg-status-error/20 text-status-error animate-pulse" 
                    : "bg-kpatrol-500/20 text-kpatrol-400"
                )}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          {/* Quick Actions */}
          <div className="pt-6">
            <p className="text-xs font-semibold text-dark-muted uppercase tracking-wider mb-3 px-3">
              Thao tác nhanh
            </p>
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg",
                  "transition-all duration-200",
                  action.active 
                    ? "text-status-success bg-status-success/10" 
                    : "text-dark-muted hover:bg-dark-surface hover:text-white"
                )}
              >
                <action.icon className="w-4 h-4" />
                <span className="text-sm flex-1 text-left">{action.label}</span>
                <div className={cn(
                  "w-8 h-4 rounded-full transition-colors relative",
                  action.active ? "bg-status-success" : "bg-dark-border"
                )}>
                  <div className={cn(
                    "absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all",
                    action.active ? "left-4" : "left-0.5"
                  )} />
                </div>
              </button>
            ))}
          </div>
        </nav>

        {/* Robot Status Card */}
        <div className="p-4 border-t border-dark-border shrink-0">
          <div 
            className={cn(
              "rounded-xl overflow-hidden transition-all",
              showRobotDetails ? "bg-dark-surface" : "bg-dark-surface/50 hover:bg-dark-surface"
            )}
          >
            {/* Header - Always visible */}
            <button 
              onClick={() => setShowRobotDetails(!showRobotDetails)}
              className="w-full p-3 flex items-center gap-3"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-kpatrol-400/20 to-kpatrol-600/20 flex items-center justify-center border border-kpatrol-500/30">
                  <Bot className="w-6 h-6 text-kpatrol-400" />
                </div>
                <div className={cn(
                  "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-dark-card",
                  isConnected ? "bg-status-success animate-pulse" : "bg-status-error"
                )} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-white text-sm">KPATROL-001</p>
                <p className={cn(
                  "text-xs",
                  isConnected ? "text-status-success" : "text-status-error"
                )}>
                  {isConnected ? '● Đang hoạt động' : '○ Mất kết nối'}
                </p>
              </div>
              <ChevronDown className={cn(
                "w-4 h-4 text-dark-muted transition-transform",
                showRobotDetails && "rotate-180"
              )} />
            </button>

            {/* Expandable Details */}
            {showRobotDetails && (
              <div className="px-3 pb-3 space-y-3 animate-slide-up">
                {/* Battery */}
                <div className="flex items-center gap-2">
                  <Battery className={cn(
                    "w-4 h-4",
                    batteryLevel > 50 ? "text-status-success" : batteryLevel > 20 ? "text-status-warning" : "text-status-error"
                  )} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-dark-muted">Pin</span>
                      <span className="text-dark-text font-medium">{batteryLevel}%</span>
                    </div>
                    <Progress 
                      value={batteryLevel} 
                      max={100} 
                      size="sm"
                      color={batteryLevel > 50 ? 'success' : batteryLevel > 20 ? 'warning' : 'error'}
                    />
                  </div>
                </div>

                {/* Temperature */}
                <div className="flex items-center gap-2">
                  <ThermometerSun className={cn(
                    "w-4 h-4",
                    temperature < 60 ? "text-status-success" : temperature < 75 ? "text-status-warning" : "text-status-error"
                  )} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-dark-muted">Nhiệt độ</span>
                      <span className="text-dark-text font-medium">{temperature}°C</span>
                    </div>
                    <Progress 
                      value={temperature} 
                      max={100} 
                      size="sm"
                      color={temperature < 60 ? 'success' : temperature < 75 ? 'warning' : 'error'}
                    />
                  </div>
                </div>

                {/* Connection Quality */}
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-status-success" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-dark-muted">Tín hiệu</span>
                      <span className="text-dark-text font-medium">Tuyệt vời</span>
                    </div>
                    <Progress value={92} max={100} size="sm" color="success" />
                  </div>
                </div>

                {/* Quick stats */}
                <div className="flex gap-2 pt-1">
                  <div className="flex-1 bg-dark-card/50 rounded-lg p-2 text-center">
                    <Activity className="w-3.5 h-3.5 text-kpatrol-400 mx-auto mb-1" />
                    <p className="text-xs text-dark-muted">Uptime</p>
                    <p className="text-sm font-semibold text-dark-text">4h 23m</p>
                  </div>
                  <div className="flex-1 bg-dark-card/50 rounded-lg p-2 text-center">
                    <Zap className="w-3.5 h-3.5 text-status-warning mx-auto mb-1" />
                    <p className="text-xs text-dark-muted">Còn lại</p>
                    <p className="text-sm font-semibold text-dark-text">~2h 15m</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Help Link */}
          <button className="w-full mt-3 flex items-center justify-center gap-2 py-2 text-xs text-dark-muted hover:text-kpatrol-400 transition-colors">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Cần hỗ trợ?</span>
          </button>
        </div>
      </aside>
    </>
  );
}
