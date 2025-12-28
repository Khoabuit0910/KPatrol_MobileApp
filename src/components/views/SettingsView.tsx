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
  Sun,
  User,
  LogOut,
  Key,
  Smartphone,
  HardDrive,
  Cpu,
  Battery,
  Gauge,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Info,
  ExternalLink,
  Github,
  Mail,
  CheckCircle,
  AlertTriangle,
  Settings2,
  Sliders,
  Volume2,
  Vibrate
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal, ConfirmDialog } from '@/components/ui/Modal';
import { Progress } from '@/components/ui/Progress';

export function SettingsView() {
  const [darkMode, setDarkMode] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingField, setEditingField] = useState<{ label: string; value: string } | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleEdit = (label: string, value: string) => {
    setEditingField({ label, value });
    setShowEditModal(true);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-8">
      {/* User Profile Card */}
      <Card variant="gradient" className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-kpatrol-400 to-kpatrol-600 flex items-center justify-center text-white text-xl font-bold shadow-glow-sm">
            VD
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-dark-text">Vũ Đăng Khoa</h3>
            <p className="text-sm text-dark-muted">admin@kpatrol.io</p>
            <div className="flex items-center gap-2 mt-2">
              <StatusBadge status="online">Đang hoạt động</StatusBadge>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </Card>

      {/* Connection Settings */}
      <SettingsSection 
        title="Kết nối" 
        icon={Wifi}
        description="Cấu hình kết nối với robot và server"
      >
        <SettingRow 
          label="Server URL" 
          value="ws://192.168.1.100:4000" 
          editable 
          onEdit={handleEdit}
          status="connected"
        />
        <SettingRow 
          label="Robot ID" 
          value="KPATROL-001" 
          editable 
          onEdit={handleEdit}
        />
        <SettingRow label="Tự động kết nối lại" toggle defaultEnabled />
        <SettingRow label="Timeout kết nối" value="30 giây" editable onEdit={handleEdit} />
        <SettingRow label="Độ trễ hiện tại" value="23ms" status="good" />
      </SettingsSection>

      {/* Robot Settings */}
      <SettingsSection 
        title="Robot" 
        icon={Bot}
        description="Cấu hình thông số robot"
      >
        <SettingRow 
          label="Tên Robot" 
          value="K-Patrol Bot 01" 
          editable 
          onEdit={handleEdit}
        />
        <SettingRow 
          label="Tốc độ tối đa" 
          value="1.0 m/s" 
          editable 
          onEdit={handleEdit}
        />
        <SettingRow label="Chế độ an toàn" toggle defaultEnabled />
        <SettingRow label="Tự động tránh vật cản" toggle defaultEnabled />
        <SettingRow label="Độ nhạy cảm biến" value="Cao" editable onEdit={handleEdit} />
        <SettingRow label="Khoảng cách an toàn" value="0.3m" editable onEdit={handleEdit} />
      </SettingsSection>

      {/* Motor Calibration */}
      <SettingsSection 
        title="Calibration Motor" 
        icon={Sliders}
        description="Hiệu chỉnh motor và bánh xe"
      >
        <SettingRow label="Motor 1 (FL)" value="100%" editable onEdit={handleEdit} />
        <SettingRow label="Motor 2 (FR)" value="98%" editable onEdit={handleEdit} />
        <SettingRow label="Motor 3 (RL)" value="100%" editable onEdit={handleEdit} />
        <SettingRow label="Motor 4 (RR)" value="97%" editable onEdit={handleEdit} />
        <div className="pt-3 flex gap-2">
          <Button variant="secondary" size="sm" className="flex-1">
            <RefreshCw className="w-4 h-4" />
            Auto Calibrate
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Settings2 className="w-4 h-4" />
            Test Motors
          </Button>
        </div>
      </SettingsSection>

      {/* Notification Settings */}
      <SettingsSection 
        title="Thông báo" 
        icon={Bell}
        description="Quản lý thông báo đẩy và cảnh báo"
      >
        <SettingRow label="Thông báo đẩy" toggle defaultEnabled />
        <SettingRow label="Cảnh báo pin yếu" toggle defaultEnabled />
        <SettingRow label="Cảnh báo mất kết nối" toggle defaultEnabled />
        <SettingRow label="Cảnh báo vật cản" toggle defaultEnabled />
        <SettingRow label="Âm thanh" toggle defaultEnabled={false} icon={Volume2} />
        <SettingRow label="Rung" toggle defaultEnabled icon={Vibrate} />
      </SettingsSection>

      {/* Appearance */}
      <SettingsSection 
        title="Giao diện" 
        icon={Palette}
        description="Tùy chỉnh giao diện ứng dụng"
      >
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon className="w-4 h-4 text-kpatrol-400" /> : <Sun className="w-4 h-4 text-status-warning" />}
            <span className="text-dark-text">Chế độ tối</span>
          </div>
          <ToggleSwitch enabled={darkMode} onChange={setDarkMode} />
        </div>
        <SettingRow label="Ngôn ngữ" value="Tiếng Việt" editable onEdit={handleEdit} />
        <SettingRow label="Hiệu ứng chuyển động" toggle defaultEnabled />
        <SettingRow label="Hiển thị FPS" toggle defaultEnabled={false} />
      </SettingsSection>

      {/* Storage & Data */}
      <SettingsSection 
        title="Dữ liệu & Lưu trữ" 
        icon={HardDrive}
        description="Quản lý dữ liệu ứng dụng"
      >
        <div className="py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-dark-text">Bộ nhớ đã dùng</span>
            <span className="text-sm text-dark-muted">45.2 MB / 100 MB</span>
          </div>
          <Progress value={45.2} max={100} size="sm" />
        </div>
        <div className="pt-3 flex gap-2">
          <Button variant="secondary" size="sm" className="flex-1">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
          <Button variant="danger" size="sm" className="flex-1">
            <Trash2 className="w-4 h-4" />
            Xóa Cache
          </Button>
        </div>
      </SettingsSection>

      {/* About & Info */}
      <SettingsSection 
        title="Thông tin" 
        icon={Info}
        description="Thông tin ứng dụng và hệ thống"
      >
        <SettingRow label="Phiên bản App" value="1.0.0" />
        <SettingRow label="Phiên bản Firmware" value="2.1.3" status="update" />
        <SettingRow label="Build" value="2024.12.28" mono />
        <SettingRow label="Device ID" value="a1b2c3d4" mono />
        <div className="pt-3 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Github className="w-4 h-4" />
            GitHub
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Mail className="w-4 h-4" />
            Hỗ trợ
          </Button>
        </div>
      </SettingsSection>

      {/* Account Actions */}
      <Card variant="glow" padding="md">
        <div className="space-y-2">
          <Button variant="secondary" className="w-full justify-start">
            <Key className="w-4 h-4" />
            Đổi mật khẩu
          </Button>
          <Button 
            variant="danger" 
            className="w-full justify-start"
            onClick={() => setShowLogoutConfirm(true)}
          >
            <LogOut className="w-4 h-4" />
            Đăng xuất
          </Button>
        </div>
      </Card>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={`Chỉnh sửa ${editingField?.label}`}
      >
        <div className="space-y-4">
          <Input
            label={editingField?.label}
            defaultValue={editingField?.value}
          />
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setShowEditModal(false)}>
              Hủy
            </Button>
            <Button variant="primary" className="flex-1" onClick={() => setShowEditModal(false)}>
              Lưu
            </Button>
          </div>
        </div>
      </Modal>

      {/* Logout Confirm Dialog */}
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={() => {
          setShowLogoutConfirm(false);
          // TODO: Handle logout
        }}
        title="Xác nhận đăng xuất"
        description="Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?"
        confirmText="Đăng xuất"
        variant="danger"
      />
    </div>
  );
}

interface SettingsSectionProps {
  title: string;
  icon: React.ElementType;
  description?: string;
  children: React.ReactNode;
}

function SettingsSection({ title, icon: Icon, description, children }: SettingsSectionProps) {
  return (
    <Card variant="glow" padding="md">
      <div className="flex items-center gap-3 mb-1">
        <div className="p-2 bg-kpatrol-500/20 rounded-lg">
          <Icon className="w-4 h-4 text-kpatrol-400" />
        </div>
        <div>
          <h3 className="font-semibold text-dark-text">{title}</h3>
          {description && <p className="text-xs text-dark-muted">{description}</p>}
        </div>
      </div>
      <div className="mt-4 divide-y divide-dark-border">
        {children}
      </div>
    </Card>
  );
}

interface SettingRowProps {
  label: string;
  value?: string;
  editable?: boolean;
  toggle?: boolean;
  defaultEnabled?: boolean;
  onEdit?: (label: string, value: string) => void;
  status?: 'connected' | 'good' | 'warning' | 'error' | 'update';
  icon?: React.ElementType;
  mono?: boolean;
}

function SettingRow({ 
  label, 
  value, 
  editable, 
  toggle, 
  defaultEnabled,
  onEdit,
  status,
  icon: Icon,
  mono
}: SettingRowProps) {
  const [enabled, setEnabled] = useState(defaultEnabled ?? false);

  const getStatusBadge = () => {
    switch (status) {
      case 'connected':
        return <Badge variant="success" size="sm">Đã kết nối</Badge>;
      case 'good':
        return <Badge variant="success" size="sm">Tốt</Badge>;
      case 'warning':
        return <Badge variant="warning" size="sm">Cảnh báo</Badge>;
      case 'error':
        return <Badge variant="danger" size="sm">Lỗi</Badge>;
      case 'update':
        return <Badge variant="primary" size="sm">Cập nhật</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-dark-muted" />}
        <span className="text-dark-text">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {getStatusBadge()}
        {toggle ? (
          <ToggleSwitch enabled={enabled} onChange={setEnabled} />
        ) : editable && onEdit ? (
          <button 
            onClick={() => onEdit(label, value || '')}
            className="flex items-center gap-1 text-dark-muted hover:text-kpatrol-400 transition-colors"
          >
            <span className={cn("text-sm", mono && "font-mono")}>{value}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <span className={cn("text-sm text-dark-muted", mono && "font-mono")}>{value}</span>
        )}
      </div>
    </div>
  );
}

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

function ToggleSwitch({ enabled, onChange }: ToggleSwitchProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={cn(
        "w-12 h-6 rounded-full transition-all relative",
        enabled ? "bg-kpatrol-500 shadow-glow-sm" : "bg-dark-border"
      )}
    >
      <div className={cn(
        "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm",
        enabled ? "left-7" : "left-1"
      )} />
    </button>
  );
}
