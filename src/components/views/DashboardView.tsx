'use client';

import { 
  Battery, 
  Thermometer, 
  Gauge, 
  Cpu, 
  HardDrive,
  Clock,
  Activity,
  Wifi,
  WifiOff,
  Zap,
  Navigation,
  AlertTriangle,
  CheckCircle,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { useRobotStore } from '@/store/robotStore';
import { formatDuration } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { StatusBadge, Badge } from '@/components/ui/Badge';
import { Progress, BatteryProgress, CircularProgress } from '@/components/ui/Progress';
import { Button } from '@/components/ui/Button';
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
    isConnected,
    position,
    motors
  } = useRobotStore();

  return (
    <div className="space-y-6">
      {/* Connection Status Banner */}
      {!isConnected ? (
        <div className="bg-status-offline/10 border border-status-offline/30 rounded-xl p-4 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-status-offline/20 rounded-lg">
              <WifiOff className="w-5 h-5 text-status-offline" />
            </div>
            <div>
              <p className="font-medium text-status-offline">Mất kết nối với Robot</p>
              <p className="text-sm text-dark-muted">Đang thử kết nối lại...</p>
            </div>
          </div>
          <Button variant="danger" size="sm">
            Kết nối lại
          </Button>
        </div>
      ) : (
        <div className="bg-status-online/10 border border-status-online/30 rounded-xl p-4 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-status-online/20 rounded-lg">
              <Wifi className="w-5 h-5 text-status-online" />
            </div>
            <div>
              <p className="font-medium text-status-online">Robot đang hoạt động</p>
              <p className="text-sm text-dark-muted">Kết nối ổn định • Độ trễ: 23ms</p>
            </div>
          </div>
          <StatusBadge status="online" />
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Battery Card */}
        <Card variant="glow" className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-kpatrol-500/20 rounded-lg">
              <Battery className="w-5 h-5 text-kpatrol-400" />
            </div>
            <Badge variant={batteryLevel > 50 ? 'success' : batteryLevel > 20 ? 'warning' : 'danger'}>
              {batteryLevel > 50 ? 'Tốt' : batteryLevel > 20 ? 'Trung bình' : 'Thấp'}
            </Badge>
          </div>
          <p className="text-2xl font-bold text-dark-text">{batteryLevel}%</p>
          <p className="text-sm text-dark-muted mb-3">Dung lượng pin</p>
          <Progress value={batteryLevel} size="sm" />
        </Card>

        {/* Temperature Card */}
        <Card variant="glow" className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-accent-500/20 rounded-lg">
              <Thermometer className="w-5 h-5 text-accent-400" />
            </div>
            <Badge variant={temperature < 50 ? 'success' : temperature < 70 ? 'warning' : 'danger'}>
              {temperature < 50 ? 'Bình thường' : temperature < 70 ? 'Ấm' : 'Nóng'}
            </Badge>
          </div>
          <p className="text-2xl font-bold text-dark-text">{temperature}°C</p>
          <p className="text-sm text-dark-muted mb-3">Nhiệt độ hệ thống</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-dark-border rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${
                  temperature < 50 ? 'bg-status-online' : temperature < 70 ? 'bg-status-warning' : 'bg-status-offline'
                }`}
                style={{ width: `${Math.min(temperature, 100)}%` }}
              />
            </div>
            <span className="text-xs text-dark-muted">100°C</span>
          </div>
        </Card>

        {/* Speed Card */}
        <Card variant="glow" className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-status-online/20 rounded-lg">
              <Gauge className="w-5 h-5 text-status-online" />
            </div>
            <Badge variant="primary">
              <Zap className="w-3 h-3" />
              Hoạt động
            </Badge>
          </div>
          <p className="text-2xl font-bold text-dark-text">{speed.toFixed(1)}</p>
          <p className="text-sm text-dark-muted mb-3">Tốc độ (m/s)</p>
          <div className="flex items-center gap-1 text-xs text-dark-muted">
            <TrendingUp className="w-3 h-3 text-status-online" />
            <span>Tốc độ tối đa: 2.0 m/s</span>
          </div>
        </Card>

        {/* Uptime Card */}
        <Card variant="glow" className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-status-warning/20 rounded-lg">
              <Clock className="w-5 h-5 text-status-warning" />
            </div>
            <Badge variant="default">Đang chạy</Badge>
          </div>
          <p className="text-2xl font-bold text-dark-text">{formatDuration(uptime)}</p>
          <p className="text-sm text-dark-muted mb-3">Thời gian hoạt động</p>
          <div className="flex items-center gap-1 text-xs text-dark-muted">
            <Activity className="w-3 h-3" />
            <span>Khởi động lúc 08:30</span>
          </div>
        </Card>
      </div>

      {/* System Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* CPU Usage */}
        <Card variant="glow" className="p-4">
          <div className="flex items-center gap-4">
            <CircularProgress 
              value={cpuUsage} 
              size={70} 
              strokeWidth={6}
              variant={cpuUsage < 70 ? 'success' : cpuUsage < 90 ? 'warning' : 'danger'}
            />
            <div>
              <p className="text-lg font-semibold text-dark-text">CPU</p>
              <p className="text-sm text-dark-muted">Raspberry Pi 4</p>
              <p className={`text-sm font-medium mt-1 ${
                cpuUsage < 70 ? 'text-status-online' : cpuUsage < 90 ? 'text-status-warning' : 'text-status-offline'
              }`}>
                {cpuUsage < 70 ? 'Bình thường' : cpuUsage < 90 ? 'Tải cao' : 'Quá tải'}
              </p>
            </div>
          </div>
        </Card>

        {/* Memory Usage */}
        <Card variant="glow" className="p-4">
          <div className="flex items-center gap-4">
            <CircularProgress 
              value={memoryUsage} 
              size={70} 
              strokeWidth={6}
              variant={memoryUsage < 70 ? 'success' : memoryUsage < 90 ? 'warning' : 'danger'}
            />
            <div>
              <p className="text-lg font-semibold text-dark-text">RAM</p>
              <p className="text-sm text-dark-muted">8GB DDR4</p>
              <p className="text-sm text-dark-muted mt-1">
                {((memoryUsage / 100) * 8).toFixed(1)} / 8 GB
              </p>
            </div>
          </div>
        </Card>

        {/* Position */}
        <Card variant="glow" className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-[70px] h-[70px] bg-kpatrol-500/20 rounded-full flex items-center justify-center">
              <MapPin className="w-8 h-8 text-kpatrol-400" />
            </div>
            <div>
              <p className="text-lg font-semibold text-dark-text">Vị trí</p>
              <p className="text-sm text-dark-muted font-mono">
                X: {position.x.toFixed(2)}m
              </p>
              <p className="text-sm text-dark-muted font-mono">
                Y: {position.y.toFixed(2)}m
              </p>
              <p className="text-sm text-dark-muted font-mono">
                θ: {position.heading.toFixed(1)}°
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Motor Status */}
        <Card variant="glow" padding="lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-kpatrol-500" />
              Trạng thái Motor
            </CardTitle>
            <StatusBadge status="online">4/4 Active</StatusBadge>
          </CardHeader>
          <CardContent>
            <MotorStatus />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card variant="glow" padding="lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent-400" />
              Thao tác nhanh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <QuickActions />
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card variant="glow" padding="lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-status-warning" />
            Cảnh báo gần đây
          </CardTitle>
          <Button variant="ghost" size="sm">Xem tất cả</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <AlertItem 
              type="warning"
              title="Pin yếu"
              message="Dung lượng pin dưới 30%, hãy cân nhắc sạc robot"
              time="5 phút trước"
            />
            <AlertItem 
              type="info"
              title="Cập nhật firmware"
              message="Phiên bản mới v2.1.0 đã sẵn sàng"
              time="1 giờ trước"
            />
            <AlertItem 
              type="success"
              title="Tuần tra hoàn tất"
              message="Robot đã hoàn thành tuyến tuần tra A1"
              time="2 giờ trước"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Alert Item Component
function AlertItem({ 
  type, 
  title, 
  message, 
  time 
}: { 
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  time: string;
}) {
  const config = {
    warning: {
      icon: AlertTriangle,
      bg: 'bg-status-warning/10',
      border: 'border-status-warning/20',
      iconColor: 'text-status-warning',
    },
    info: {
      icon: Activity,
      bg: 'bg-kpatrol-500/10',
      border: 'border-kpatrol-500/20',
      iconColor: 'text-kpatrol-400',
    },
    success: {
      icon: CheckCircle,
      bg: 'bg-status-online/10',
      border: 'border-status-online/20',
      iconColor: 'text-status-online',
    },
    error: {
      icon: AlertTriangle,
      bg: 'bg-status-offline/10',
      border: 'border-status-offline/20',
      iconColor: 'text-status-offline',
    },
  };

  const { icon: Icon, bg, border, iconColor } = config[type];

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg ${bg} border ${border}`}>
      <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-dark-text">{title}</p>
        <p className="text-sm text-dark-muted">{message}</p>
      </div>
      <span className="text-xs text-dark-muted whitespace-nowrap">{time}</span>
    </div>
  );
}
