'use client';

import { 
  Battery, 
  Thermometer, 
  Gauge, 
  Cpu, 
  HardDrive,
  Clock,
  Activity,
  Wifi
} from 'lucide-react';
import { useRobotStore } from '@/store/robotStore';
import { formatDuration } from '@/lib/utils';
import { StatusCard } from '@/components/ui/StatusCard';
import { MotorStatus } from '@/components/dashboard/MotorStatus';
import { QuickActions } from '@/components/dashboard/QuickActions';

export function DashboardView() {
  const { 
    batteryLevel, 
    temperature, 
    speed, 
    cpuUsage, 
    memoryUsage, 
    uptime,
    isConnected 
  } = useRobotStore();

  return (
    <div className="space-y-6">
      {/* Connection Alert */}
      {!isConnected && (
        <div className="bg-status-offline/20 border border-status-offline/30 rounded-lg p-4 flex items-center gap-3">
          <Wifi className="w-5 h-5 text-status-offline" />
          <div>
            <p className="font-medium text-status-offline">Mất kết nối với Robot</p>
            <p className="text-sm text-dark-muted">Đang thử kết nối lại...</p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatusCard
          icon={Battery}
          label="Pin"
          value={`${batteryLevel}%`}
          status={batteryLevel > 50 ? 'success' : batteryLevel > 20 ? 'warning' : 'danger'}
          progress={batteryLevel}
        />
        <StatusCard
          icon={Thermometer}
          label="Nhiệt độ"
          value={`${temperature}°C`}
          status={temperature < 60 ? 'success' : temperature < 75 ? 'warning' : 'danger'}
        />
        <StatusCard
          icon={Gauge}
          label="Tốc độ"
          value={`${speed} m/s`}
          status="info"
        />
        <StatusCard
          icon={Cpu}
          label="CPU"
          value={`${cpuUsage}%`}
          status={cpuUsage < 70 ? 'success' : cpuUsage < 90 ? 'warning' : 'danger'}
          progress={cpuUsage}
        />
        <StatusCard
          icon={HardDrive}
          label="RAM"
          value={`${memoryUsage}%`}
          status={memoryUsage < 70 ? 'success' : memoryUsage < 90 ? 'warning' : 'danger'}
          progress={memoryUsage}
        />
        <StatusCard
          icon={Clock}
          label="Uptime"
          value={formatDuration(uptime)}
          status="info"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Motor Status */}
        <div className="card-glow p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-kpatrol-500" />
            Trạng thái Motor
          </h3>
          <MotorStatus />
        </div>

        {/* Quick Actions */}
        <div className="card-glow p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Thao tác nhanh
          </h3>
          <QuickActions />
        </div>
      </div>

      {/* Activity Chart Placeholder */}
      <div className="card-glow p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Hoạt động gần đây
        </h3>
        <div className="h-48 flex items-center justify-center text-dark-muted">
          <p>Biểu đồ hoạt động sẽ hiển thị ở đây</p>
        </div>
      </div>
    </div>
  );
}
