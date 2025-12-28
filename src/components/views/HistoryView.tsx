'use client';

import { useState } from 'react';
import { 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Filter,
  History,
  Activity,
  Navigation,
  Battery,
  Wifi,
  WifiOff,
  Play,
  MapPin,
  Calendar,
  ChevronDown,
  Search,
  Download,
  Trash2,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

type HistoryType = 'all' | 'movement' | 'alert' | 'system' | 'patrol';
type TimeRange = 'today' | 'week' | 'month' | 'all';

interface HistoryItem {
  id: string;
  type: 'movement' | 'alert' | 'system' | 'error' | 'patrol';
  title: string;
  description: string;
  timestamp: Date;
  status?: 'success' | 'warning' | 'error' | 'info';
  details?: Record<string, string | number>;
}

// Mock data
const mockHistory: HistoryItem[] = [
  {
    id: '1',
    type: 'patrol',
    title: 'Tuần tra Khu vực A',
    description: 'Hoàn thành 100% tuyến đường, không phát hiện bất thường',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: 'success',
    details: { duration: '15 phút', distance: '120m' },
  },
  {
    id: '2',
    type: 'movement',
    title: 'Di chuyển tiến',
    description: 'Tốc độ: 0.5 m/s, Thời gian: 30s',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    status: 'success',
    details: { speed: '0.5 m/s', distance: '15m' },
  },
  {
    id: '3',
    type: 'alert',
    title: 'Phát hiện vật cản',
    description: 'Khoảng cách: 0.3m, Vị trí: Phía trước bên trái',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    status: 'warning',
    details: { distance: '0.3m', action: 'Tránh vật cản' },
  },
  {
    id: '4',
    type: 'system',
    title: 'Kết nối WebSocket',
    description: 'Robot đã kết nối với Server backend thành công',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: 'success',
    details: { latency: '23ms', server: 'kpatrol.local:4000' },
  },
  {
    id: '5',
    type: 'error',
    title: 'Mất kết nối tạm thời',
    description: 'Mất kết nối WiFi trong 5 giây, đã tự động kết nối lại',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    status: 'error',
    details: { duration: '5s', retry: '2 lần' },
  },
  {
    id: '6',
    type: 'alert',
    title: 'Pin yếu',
    description: 'Dung lượng pin còn 20%, robot đang di chuyển về trạm sạc',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    status: 'warning',
    details: { battery: '20%', action: 'Tự động sạc' },
  },
  {
    id: '7',
    type: 'movement',
    title: 'Xoay phải 90°',
    description: 'Hoàn thành xoay trong 2 giây',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    status: 'success',
    details: { angle: '90°', direction: 'Clockwise' },
  },
  {
    id: '8',
    type: 'patrol',
    title: 'Bắt đầu tuần tra',
    description: 'Khởi động tuần tra theo tuyến B2',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    status: 'info',
    details: { route: 'B2', checkpoints: '8' },
  },
];

const typeConfig = {
  movement: { 
    icon: ArrowUpRight, 
    label: 'Di chuyển',
    color: 'text-kpatrol-400 bg-kpatrol-500/20' 
  },
  alert: { 
    icon: AlertTriangle, 
    label: 'Cảnh báo',
    color: 'text-status-warning bg-status-warning/20' 
  },
  system: { 
    icon: Activity, 
    label: 'Hệ thống',
    color: 'text-accent-400 bg-accent-500/20' 
  },
  error: { 
    icon: XCircle, 
    label: 'Lỗi',
    color: 'text-status-offline bg-status-offline/20' 
  },
  patrol: { 
    icon: Navigation, 
    label: 'Tuần tra',
    color: 'text-status-online bg-status-online/20' 
  },
};

const statusColors = {
  success: 'bg-status-online/20 text-status-online border-status-online/30',
  warning: 'bg-status-warning/20 text-status-warning border-status-warning/30',
  error: 'bg-status-offline/20 text-status-offline border-status-offline/30',
  info: 'bg-kpatrol-500/20 text-kpatrol-400 border-kpatrol-500/30',
};

export function HistoryView() {
  const [selectedType, setSelectedType] = useState<HistoryType>('all');
  const [timeRange, setTimeRange] = useState<TimeRange>('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const filteredHistory = mockHistory.filter(item => {
    if (selectedType !== 'all' && item.type !== selectedType) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: mockHistory.length,
    movements: mockHistory.filter(i => i.type === 'movement').length,
    alerts: mockHistory.filter(i => i.type === 'alert').length,
    errors: mockHistory.filter(i => i.type === 'error').length,
    patrols: mockHistory.filter(i => i.type === 'patrol').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-kpatrol-500/20 rounded-lg">
            <History className="w-5 h-5 text-kpatrol-400" />
          </div>
          <div>
            <h2 className="font-semibold text-dark-text">Lịch sử hoạt động</h2>
            <p className="text-sm text-dark-muted">{stats.total} hoạt động được ghi nhận</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard 
          label="Tổng" 
          value={stats.total.toString()} 
          icon={Activity}
          onClick={() => setSelectedType('all')}
          active={selectedType === 'all'}
        />
        <StatCard 
          label="Di chuyển" 
          value={stats.movements.toString()} 
          icon={ArrowUpRight}
          color="primary"
          onClick={() => setSelectedType('movement')}
          active={selectedType === 'movement'}
        />
        <StatCard 
          label="Tuần tra" 
          value={stats.patrols.toString()} 
          icon={Navigation}
          color="success"
          onClick={() => setSelectedType('patrol')}
          active={selectedType === 'patrol'}
        />
        <StatCard 
          label="Cảnh báo" 
          value={stats.alerts.toString()} 
          icon={AlertTriangle}
          color="warning"
          onClick={() => setSelectedType('alert')}
          active={selectedType === 'alert'}
        />
        <StatCard 
          label="Lỗi" 
          value={stats.errors.toString()} 
          icon={XCircle}
          color="error"
          onClick={() => setSelectedType('system')}
          active={selectedType === 'system'}
        />
      </div>

      {/* Filters */}
      <Card variant="glow" padding="md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Tìm kiếm hoạt động..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <div className="flex gap-2">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as TimeRange)}
              className="bg-dark-surface border border-dark-border rounded-lg px-3 py-2 text-sm text-dark-text focus:outline-none focus:border-kpatrol-500"
            >
              <option value="today">Hôm nay</option>
              <option value="week">7 ngày</option>
              <option value="month">30 ngày</option>
              <option value="all">Tất cả</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <Card variant="glow" padding="none">
        <div className="divide-y divide-dark-border">
          {filteredHistory.length === 0 ? (
            <div className="p-8 text-center text-dark-muted">
              <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Không có hoạt động nào</p>
            </div>
          ) : (
            filteredHistory.map((item) => {
              const config = typeConfig[item.type];
              const Icon = config.icon;
              const isExpanded = expandedItem === item.id;

              return (
                <div 
                  key={item.id}
                  className="p-4 hover:bg-dark-surface/50 transition-colors cursor-pointer"
                  onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                >
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                      config.color
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium text-dark-text">{item.title}</h4>
                          <p className="text-sm text-dark-muted mt-0.5">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {item.status && (
                            <Badge variant={item.status === 'success' ? 'success' : item.status === 'warning' ? 'warning' : item.status === 'error' ? 'danger' : 'primary'}>
                              {item.status === 'success' ? 'Thành công' : 
                               item.status === 'warning' ? 'Cảnh báo' : 
                               item.status === 'error' ? 'Lỗi' : 'Thông tin'}
                            </Badge>
                          )}
                          <span className="text-xs text-dark-muted whitespace-nowrap">
                            {formatTimeAgo(item.timestamp)}
                          </span>
                          <ChevronDown className={cn(
                            "w-4 h-4 text-dark-muted transition-transform",
                            isExpanded && "rotate-180"
                          )} />
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && item.details && (
                        <div className="mt-3 p-3 bg-dark-surface rounded-lg animate-fade-in">
                          <p className="text-xs text-dark-muted mb-2 uppercase tracking-wide">Chi tiết</p>
                          <div className="grid grid-cols-2 gap-3">
                            {Object.entries(item.details).map(([key, value]) => (
                              <div key={key}>
                                <p className="text-xs text-dark-muted capitalize">{key}</p>
                                <p className="text-sm text-dark-text font-mono">{value}</p>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2 mt-3 pt-3 border-t border-dark-border">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-3 h-3" />
                              Chi tiết
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Play className="w-3 h-3" />
                              Phát lại
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Load More */}
        {filteredHistory.length > 0 && (
          <div className="p-4 border-t border-dark-border">
            <Button variant="ghost" className="w-full">
              Xem thêm lịch sử
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  color?: 'primary' | 'success' | 'warning' | 'error';
  onClick?: () => void;
  active?: boolean;
}

function StatCard({ label, value, icon: Icon, color, onClick, active }: StatCardProps) {
  const colorClasses = {
    primary: 'text-kpatrol-400',
    success: 'text-status-online',
    warning: 'text-status-warning',
    error: 'text-status-offline',
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        "card-glow p-4 cursor-pointer transition-all",
        active && "border-kpatrol-500/50 shadow-glow-sm"
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <Icon className={cn(
          "w-4 h-4",
          color ? colorClasses[color] : 'text-dark-muted'
        )} />
        {active && <div className="w-2 h-2 rounded-full bg-kpatrol-500" />}
      </div>
      <p className={cn(
        "text-2xl font-bold",
        color ? colorClasses[color] : 'text-dark-text'
      )}>
        {value}
      </p>
      <p className="text-xs text-dark-muted mt-1">{label}</p>
    </div>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'Vừa xong';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} phút trước`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} giờ trước`;
  return `${Math.floor(seconds / 86400)} ngày trước`;
}
