'use client';

import { useState } from 'react';
import { 
  Wifi, 
  Server, 
  Bot, 
  Bell, 
  Palette, 
  Shield,
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function SettingsView() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Connection Settings */}
      <SettingsSection 
        title="Kết nối" 
        icon={Wifi}
        items={[
          { label: 'Server URL', value: 'ws://192.168.1.100:3001', editable: true },
          { label: 'Robot ID', value: 'KPATROL-001', editable: true },
          { label: 'Tự động kết nối lại', toggle: true, enabled: true },
        ]}
      />

      {/* Robot Settings */}
      <SettingsSection 
        title="Robot" 
        icon={Bot}
        items={[
          { label: 'Tên Robot', value: 'K-Patrol Bot 01', editable: true },
          { label: 'Tốc độ tối đa', value: '1.0 m/s', editable: true },
          { label: 'Chế độ an toàn', toggle: true, enabled: true },
          { label: 'Tự động tránh vật cản', toggle: true, enabled: true },
        ]}
      />

      {/* Notification Settings */}
      <SettingsSection 
        title="Thông báo" 
        icon={Bell}
        items={[
          { label: 'Thông báo đẩy', toggle: true, enabled: true },
          { label: 'Cảnh báo pin yếu', toggle: true, enabled: true },
          { label: 'Cảnh báo mất kết nối', toggle: true, enabled: true },
          { label: 'Âm thanh', toggle: true, enabled: false },
        ]}
      />

      {/* Appearance */}
      <div className="card-glow p-4">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="w-5 h-5 text-kpatrol-500" />
          <h3 className="font-semibold text-white">Giao diện</h3>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-dark-text">Chế độ tối</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={cn(
              "w-12 h-6 rounded-full transition-colors relative",
              darkMode ? "bg-kpatrol-500" : "bg-dark-border"
            )}
          >
            <div className={cn(
              "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
              darkMode ? "left-7" : "left-1"
            )} />
          </button>
        </div>
      </div>

      {/* About */}
      <div className="card-glow p-4">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-kpatrol-500" />
          <h3 className="font-semibold text-white">Thông tin</h3>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-dark-muted">Phiên bản App</span>
            <span className="text-dark-text">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-muted">Phiên bản Firmware</span>
            <span className="text-dark-text">2.1.3</span>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-muted">Build</span>
            <span className="text-dark-text font-mono">2024.12.27</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SettingItem {
  label: string;
  value?: string;
  editable?: boolean;
  toggle?: boolean;
  enabled?: boolean;
}

interface SettingsSectionProps {
  title: string;
  icon: React.ElementType;
  items: SettingItem[];
}

function SettingsSection({ title, icon: Icon, items }: SettingsSectionProps) {
  return (
    <div className="card-glow p-4">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-5 h-5 text-kpatrol-500" />
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-1">
        {items.map((item, index) => (
          <div 
            key={index}
            className="flex items-center justify-between py-3 border-b border-dark-border last:border-0"
          >
            <span className="text-dark-text">{item.label}</span>
            {item.toggle ? (
              <ToggleSwitch enabled={item.enabled || false} />
            ) : item.editable ? (
              <button className="flex items-center gap-1 text-dark-muted hover:text-kpatrol-400 transition-colors">
                <span className="text-sm">{item.value}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-dark-muted text-sm">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ToggleSwitch({ enabled }: { enabled: boolean }) {
  const [isEnabled, setIsEnabled] = useState(enabled);

  return (
    <button
      onClick={() => setIsEnabled(!isEnabled)}
      className={cn(
        "w-12 h-6 rounded-full transition-colors relative",
        isEnabled ? "bg-kpatrol-500" : "bg-dark-border"
      )}
    >
      <div className={cn(
        "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
        isEnabled ? "left-7" : "left-1"
      )} />
    </button>
  );
}
