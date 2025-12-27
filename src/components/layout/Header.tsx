'use client';

import { Menu, Bell, Wifi, WifiOff, Battery } from 'lucide-react';
import { useRobotStore } from '@/store/robotStore';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

export function Header({ onMenuClick, title }: HeaderProps) {
  const { isConnected, batteryLevel } = useRobotStore();

  return (
    <header className="h-16 bg-dark-card border-b border-dark-border flex items-center justify-between px-4">
      {/* Left: Menu + Title */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-dark-border rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>

      {/* Right: Status indicators */}
      <div className="flex items-center gap-4">
        {/* Battery */}
        <div className="flex items-center gap-2 text-sm">
          <Battery className={`w-5 h-5 ${
            batteryLevel > 50 ? 'text-status-online' : 
            batteryLevel > 20 ? 'text-status-warning' : 'text-status-offline'
          }`} />
          <span className="text-dark-muted">{batteryLevel}%</span>
        </div>

        {/* Connection Status */}
        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Wifi className="w-5 h-5 text-status-online" />
              <span className="text-sm text-status-online hidden sm:inline">Kết nối</span>
            </>
          ) : (
            <>
              <WifiOff className="w-5 h-5 text-status-offline" />
              <span className="text-sm text-status-offline hidden sm:inline">Mất kết nối</span>
            </>
          )}
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-dark-border rounded-lg">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-status-offline rounded-full" />
        </button>
      </div>
    </header>
  );
}
