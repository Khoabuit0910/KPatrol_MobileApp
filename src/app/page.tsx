'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { DashboardView } from '@/components/views/DashboardView';
import { ControlView } from '@/components/views/ControlView';
import { CameraView } from '@/components/views/CameraView';
import { HistoryView } from '@/components/views/HistoryView';
import { SettingsView } from '@/components/views/SettingsView';

type ViewType = 'dashboard' | 'control' | 'camera' | 'history' | 'settings';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'control':
        return <ControlView />;
      case 'camera':
        return <CameraView />;
      case 'history':
        return <HistoryView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-dark-bg overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        currentView={currentView}
        onViewChange={setCurrentView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          title={getViewTitle(currentView)}
        />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

function getViewTitle(view: ViewType): string {
  const titles: Record<ViewType, string> = {
    dashboard: 'Dashboard',
    control: 'Điều khiển',
    camera: 'Camera',
    history: 'Lịch sử',
    settings: 'Cài đặt',
  };
  return titles[view];
}
