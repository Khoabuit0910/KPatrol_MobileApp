'use client';

import { Video, VideoOff, Maximize2, Settings, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function CameraView() {
  const [isConnected, setIsConnected] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Camera Feed */}
      <div className={cn(
        "relative flex-1 bg-dark-card rounded-xl overflow-hidden border border-dark-border",
        isFullscreen && "fixed inset-0 z-50 rounded-none"
      )}>
        {/* Video placeholder */}
        {isConnected ? (
          <video 
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-dark-muted">
            <VideoOff className="w-16 h-16 mb-4" />
            <p className="text-lg font-medium">Camera chưa kết nối</p>
            <p className="text-sm">Nhấn nút bên dưới để kết nối</p>
          </div>
        )}

        {/* Overlay controls */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="p-2 bg-dark-bg/80 rounded-lg hover:bg-dark-bg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 bg-dark-bg/80 rounded-lg hover:bg-dark-bg transition-colors"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>

        {/* Status badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-dark-bg/80 rounded-full">
          <div className={cn(
            "w-2 h-2 rounded-full",
            isConnected ? "bg-status-online" : "bg-status-offline"
          )} />
          <span className="text-sm">{isConnected ? 'LIVE' : 'Offline'}</span>
        </div>

        {/* Recording indicator */}
        {isConnected && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-status-offline/80 rounded-full">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-sm text-white">REC</span>
          </div>
        )}
      </div>

      {/* Camera Controls */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setIsConnected(!isConnected)}
          className={cn(
            "py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all",
            isConnected 
              ? "bg-status-offline/20 text-status-offline border border-status-offline/30" 
              : "bg-kpatrol-500 text-white"
          )}
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
        </button>

        <button className="py-3 rounded-xl font-medium flex items-center justify-center gap-2 bg-dark-card border border-dark-border hover:bg-dark-border transition-colors">
          <RefreshCw className="w-5 h-5" />
          Làm mới
        </button>
      </div>

      {/* Camera Info */}
      <div className="card-glow p-4">
        <h3 className="text-sm font-medium text-white mb-3">Thông tin Camera</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-dark-muted">Độ phân giải</p>
            <p className="font-mono">1280x720</p>
          </div>
          <div>
            <p className="text-dark-muted">FPS</p>
            <p className="font-mono">30</p>
          </div>
          <div>
            <p className="text-dark-muted">Latency</p>
            <p className="font-mono text-status-online">~120ms</p>
          </div>
          <div>
            <p className="text-dark-muted">Protocol</p>
            <p className="font-mono">WebRTC</p>
          </div>
        </div>
      </div>
    </div>
  );
}
