'use client';

import { 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HistoryItem {
  id: string;
  type: 'movement' | 'alert' | 'system' | 'error';
  title: string;
  description: string;
  timestamp: Date;
  status?: 'success' | 'warning' | 'error';
}

// Mock data
const mockHistory: HistoryItem[] = [
  {
    id: '1',
    type: 'movement',
    title: 'Di chuyển tiến',
    description: 'Tốc độ: 0.5 m/s, Thời gian: 30s',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: 'success',
  },
  {
    id: '2',
    type: 'alert',
    title: 'Phát hiện vật cản',
    description: 'Khoảng cách: 0.3m, Vị trí: Phía trước',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    status: 'warning',
  },
  {
    id: '3',
    type: 'system',
    title: 'Kết nối thành công',
    description: 'Robot đã kết nối với Server',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: 'success',
  },
  {
    id: '4',
    type: 'error',
    title: 'Mất kết nối tạm thời',
    description: 'Thời gian mất: 5 giây',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    status: 'error',
  },
  {
    id: '5',
    type: 'movement',
    title: 'Xoay phải 90°',
    description: 'Hoàn thành trong 2s',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    status: 'success',
  },
];

const typeIcons = {
  movement: ArrowUpRight,
  alert: AlertTriangle,
  system: CheckCircle,
  error: XCircle,
};

const statusColors = {
  success: 'text-status-online bg-status-online/20',
  warning: 'text-status-warning bg-status-warning/20',
  error: 'text-status-offline bg-status-offline/20',
};

export function HistoryView() {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Lịch sử hoạt động</h3>
        <button className="flex items-center gap-2 px-3 py-2 bg-dark-card border border-dark-border rounded-lg hover:bg-dark-border transition-colors">
          <Filter className="w-4 h-4" />
          <span className="text-sm">Bộ lọc</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Tổng hoạt động" value="156" />
        <StatCard label="Di chuyển" value="89" />
        <StatCard label="Cảnh báo" value="12" color="warning" />
        <StatCard label="Lỗi" value="3" color="error" />
      </div>

      {/* Timeline */}
      <div className="card-glow p-4">
        <div className="space-y-4">
          {mockHistory.map((item, index) => {
            const Icon = typeIcons[item.type];
            return (
              <div 
                key={item.id}
                className={cn(
                  "flex gap-4 pb-4",
                  index < mockHistory.length - 1 && "border-b border-dark-border"
                )}
              >
                {/* Icon */}
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                  item.status && statusColors[item.status]
                )}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-white">{item.title}</h4>
                    <span className="text-xs text-dark-muted whitespace-nowrap">
                      {formatTimeAgo(item.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-dark-muted mt-1">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <button className="w-full mt-4 py-3 text-center text-sm text-kpatrol-400 hover:text-kpatrol-300 transition-colors">
          Xem thêm lịch sử
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color?: 'warning' | 'error' }) {
  return (
    <div className="card-glow p-4">
      <p className="text-sm text-dark-muted">{label}</p>
      <p className={cn(
        "text-2xl font-bold mt-1",
        color === 'warning' && 'text-status-warning',
        color === 'error' && 'text-status-offline',
        !color && 'text-white'
      )}>
        {value}
      </p>
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
