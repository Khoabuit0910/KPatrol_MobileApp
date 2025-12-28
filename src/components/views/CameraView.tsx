'use client';

import { 
  Video, 
  VideoOff, 
  Maximize2, 
  Minimize2,
  Settings, 
  RefreshCw,
  Camera,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Share2,
  Circle,
  Square,
  Flashlight
} from 'lucide-react';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';

type CameraQuality = '480p' | '720p' | '1080p';
type CameraMode = 'normal' | 'night' | 'thermal';

export function CameraView() {
  const [isConnected, setIsConnected] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [quality, setQuality] = useState<CameraQuality>('720p');
  const [cameraMode, setCameraMode] = useState<CameraMode>('normal');
  const [zoom, setZoom] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => {
      if (direction === 'in') return Math.min(prev + 0.25, 3);
      return Math.max(prev - 0.25, 1);
    });
  };

  const handleSnapshot = () => {
    // TODO: Capture snapshot from video stream
    console.log('Snapshot captured');
  };

  return (
    <div className={cn(
      "h-full flex flex-col gap-4",
      isFullscreen && "fixed inset-0 z-50 bg-dark-bg p-4"
    )}>
      {/* Camera Feed Container */}
      <div className="relative flex-1 bg-dark-surface rounded-xl overflow-hidden border border-dark-border min-h-[300px]">
        {/* Video Feed */}
        {isConnected ? (
          <div className="relative w-full h-full">
            <video 
              ref={videoRef}
              className="w-full h-full object-cover transition-transform"
              style={{ transform: `scale(${zoom})` }}
              autoPlay
              playsInline
              muted={isMuted}
            />
            
            {/* Camera mode overlay */}
            {cameraMode === 'night' && (
              <div className="absolute inset-0 bg-green-900/30 mix-blend-multiply pointer-events-none" />
            )}
            {cameraMode === 'thermal' && (
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-red-500/20 to-purple-500/20 mix-blend-multiply pointer-events-none" />
            )}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-dark-muted bg-dark-surface">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-dark-card border-2 border-dark-border flex items-center justify-center mb-4">
                <VideoOff className="w-10 h-10" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-status-offline flex items-center justify-center">
                <span className="text-white text-xs font-bold">!</span>
              </div>
            </div>
            <p className="text-lg font-medium text-dark-text">Camera chưa kết nối</p>
            <p className="text-sm text-dark-muted mt-1">Nhấn nút bên dưới để kết nối stream</p>
          </div>
        )}

        {/* Top Overlay Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          {/* Left: Status */}
          <div className="flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
              isConnected ? "bg-status-online/20 text-status-online" : "bg-dark-bg/80 text-dark-muted"
            )}>
              <div className={cn(
                "w-2 h-2 rounded-full",
                isConnected ? "bg-status-online animate-pulse" : "bg-status-offline"
              )} />
              {isConnected ? 'LIVE' : 'Offline'}
            </div>
            
            {isConnected && (
              <Badge variant="primary" className="bg-dark-bg/80">
                {quality}
              </Badge>
            )}
          </div>

          {/* Right: Quick Actions */}
          <div className="flex items-center gap-2">
            {isConnected && (
              <>
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 bg-dark-bg/80 rounded-lg hover:bg-dark-bg transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className={cn(
                    "p-2 bg-dark-bg/80 rounded-lg hover:bg-dark-bg transition-colors",
                    showSettings && "bg-kpatrol-500/20 text-kpatrol-400"
                  )}
                >
                  <Settings className="w-4 h-4" />
                </button>
              </>
            )}
            <button 
              onClick={handleFullscreen}
              className="p-2 bg-dark-bg/80 rounded-lg hover:bg-dark-bg transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Bottom Overlay Controls */}
        {isConnected && (
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            {/* Left: Recording */}
            <div className="flex items-center gap-2">
              {isRecording && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-status-offline/90 rounded-full animate-pulse">
                  <Circle className="w-3 h-3 fill-white text-white" />
                  <span className="text-sm text-white font-medium">REC</span>
                  <span className="text-xs text-white/80">00:32</span>
                </div>
              )}
            </div>

            {/* Center: Zoom */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-bg/80 rounded-full">
              <button 
                onClick={() => handleZoom('out')}
                disabled={zoom <= 1}
                className="p-1 hover:text-kpatrol-400 disabled:opacity-50 disabled:hover:text-current"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm font-mono min-w-[40px] text-center">{zoom.toFixed(1)}x</span>
              <button 
                onClick={() => handleZoom('in')}
                disabled={zoom >= 3}
                className="p-1 hover:text-kpatrol-400 disabled:opacity-50 disabled:hover:text-current"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button 
                onClick={handleSnapshot}
                className="p-2 bg-dark-bg/80 rounded-lg hover:bg-dark-bg transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Settings Panel */}
        {showSettings && isConnected && (
          <div className="absolute top-16 right-4 w-64 bg-dark-card/95 backdrop-blur-sm border border-dark-border rounded-xl p-4 animate-fade-in">
            <h4 className="text-sm font-medium text-dark-text mb-3">Cài đặt Camera</h4>
            
            {/* Quality */}
            <div className="mb-4">
              <p className="text-xs text-dark-muted mb-2">Chất lượng</p>
              <div className="flex gap-2">
                {(['480p', '720p', '1080p'] as CameraQuality[]).map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuality(q)}
                    className={cn(
                      "flex-1 py-1.5 text-xs rounded-md transition-all",
                      quality === q 
                        ? "bg-kpatrol-500 text-white" 
                        : "bg-dark-surface text-dark-muted hover:text-dark-text"
                    )}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode */}
            <div>
              <p className="text-xs text-dark-muted mb-2">Chế độ</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCameraMode('normal')}
                  className={cn(
                    "flex-1 py-2 rounded-md flex flex-col items-center gap-1 transition-all",
                    cameraMode === 'normal' 
                      ? "bg-kpatrol-500 text-white" 
                      : "bg-dark-surface text-dark-muted hover:text-dark-text"
                  )}
                >
                  <Sun className="w-4 h-4" />
                  <span className="text-xs">Thường</span>
                </button>
                <button
                  onClick={() => setCameraMode('night')}
                  className={cn(
                    "flex-1 py-2 rounded-md flex flex-col items-center gap-1 transition-all",
                    cameraMode === 'night' 
                      ? "bg-status-online text-white" 
                      : "bg-dark-surface text-dark-muted hover:text-dark-text"
                  )}
                >
                  <Moon className="w-4 h-4" />
                  <span className="text-xs">Đêm</span>
                </button>
                <button
                  onClick={() => setCameraMode('thermal')}
                  className={cn(
                    "flex-1 py-2 rounded-md flex flex-col items-center gap-1 transition-all",
                    cameraMode === 'thermal' 
                      ? "bg-status-warning text-white" 
                      : "bg-dark-surface text-dark-muted hover:text-dark-text"
                  )}
                >
                  <Flashlight className="w-4 h-4" />
                  <span className="text-xs">Nhiệt</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Camera Controls */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => setIsConnected(!isConnected)}
          variant={isConnected ? 'danger' : 'primary'}
          className="py-3"
        >
          {isConnected ? (
            <>
              <VideoOff className="w-5 h-5" />
              Ngắt kết nối
            </>
          ) : (
            <>
              <Video className="w-5 h-5" />
              Kết nối Camera
            </>
          )}
        </Button>

        <Button
          variant="secondary"
          className="py-3"
          disabled={!isConnected}
        >
          <RefreshCw className="w-5 h-5" />
          Làm mới
        </Button>
      </div>

      {/* Recording Controls */}
      {isConnected && (
        <div className="grid grid-cols-4 gap-3">
          <Button
            onClick={() => setIsRecording(!isRecording)}
            variant={isRecording ? 'danger' : 'secondary'}
            className="py-3"
          >
            {isRecording ? <Square className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
          </Button>
          <Button variant="secondary" className="py-3" onClick={handleSnapshot}>
            <Camera className="w-4 h-4" />
          </Button>
          <Button variant="secondary" className="py-3">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="secondary" className="py-3">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Camera Info */}
      <Card variant="glow" padding="md">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Camera className="w-4 h-4 text-kpatrol-400" />
            Thông tin Camera
          </CardTitle>
          <StatusBadge status={isConnected ? 'online' : 'offline'} />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-dark-surface rounded-lg">
              <p className="text-dark-muted text-xs mb-1">Độ phân giải</p>
              <p className="font-mono text-dark-text">
                {quality === '480p' ? '854×480' : quality === '720p' ? '1280×720' : '1920×1080'}
              </p>
            </div>
            <div className="p-3 bg-dark-surface rounded-lg">
              <p className="text-dark-muted text-xs mb-1">FPS</p>
              <p className="font-mono text-dark-text">30</p>
            </div>
            <div className="p-3 bg-dark-surface rounded-lg">
              <p className="text-dark-muted text-xs mb-1">Độ trễ</p>
              <p className={cn(
                "font-mono",
                isConnected ? "text-status-online" : "text-dark-muted"
              )}>
                {isConnected ? '~85ms' : '--'}
              </p>
            </div>
            <div className="p-3 bg-dark-surface rounded-lg">
              <p className="text-dark-muted text-xs mb-1">Protocol</p>
              <p className="font-mono text-dark-text">WebRTC</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
