'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useRobotStore } from '@/store/robotStore';
import { cn } from '@/lib/utils';
import { 
  StopCircle, 
  RotateCcw, 
  RotateCw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

export function ControlView() {
  return (
    <div className="h-full flex flex-col gap-6">
      {/* Control Mode Toggle */}
      <div className="flex items-center justify-center gap-4">
        <button className="px-4 py-2 bg-kpatrol-500 text-white rounded-lg font-medium">
          Joystick
        </button>
        <button className="px-4 py-2 bg-dark-card text-dark-muted rounded-lg font-medium hover:bg-dark-border">
          D-Pad
        </button>
      </div>

      {/* Main Control Area */}
      <div className="flex-1 grid md:grid-cols-2 gap-6">
        {/* Joystick */}
        <div className="card-glow p-6 flex flex-col items-center justify-center">
          <h3 className="text-sm text-dark-muted mb-4">Di chuyển</h3>
          <Joystick />
        </div>

        {/* Rotation Control */}
        <div className="card-glow p-6 flex flex-col items-center justify-center">
          <h3 className="text-sm text-dark-muted mb-4">Xoay</h3>
          <RotationControl />
        </div>
      </div>

      {/* Quick Buttons */}
      <div className="grid grid-cols-4 gap-3">
        <DirectionButton direction="up" icon={<ArrowUp className="w-6 h-6" />} />
        <DirectionButton direction="down" icon={<ArrowDown className="w-6 h-6" />} />
        <DirectionButton direction="left" icon={<ArrowLeft className="w-6 h-6" />} />
        <DirectionButton direction="right" icon={<ArrowRight className="w-6 h-6" />} />
      </div>

      {/* Emergency Stop */}
      <button className="w-full py-4 bg-status-offline/20 hover:bg-status-offline/30 border border-status-offline/30 rounded-xl text-status-offline font-bold flex items-center justify-center gap-2 transition-all">
        <StopCircle className="w-6 h-6" />
        DỪNG KHẨN CẤP
      </button>
    </div>
  );
}

function Joystick() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const { setJoystick } = useRobotStore();

  const maxRadius = 60;

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let dx = clientX - centerX;
    let dy = clientY - centerY;

    // Limit to circle
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > maxRadius) {
      dx = (dx / distance) * maxRadius;
      dy = (dy / distance) * maxRadius;
    }

    setPosition({ x: dx, y: dy });

    // Normalize to -1 to 1
    const normalX = dx / maxRadius;
    const normalY = -dy / maxRadius; // Invert Y
    setJoystick(normalX, normalY);
  }, [setJoystick]);

  const handleStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const touch = 'touches' in e ? e.touches[0] : e;
    handleMove(touch.clientX, touch.clientY);
  }, [handleMove]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
    setJoystick(0, 0);
  }, [setJoystick]);

  useEffect(() => {
    const handleGlobalMove = (e: TouchEvent | MouseEvent) => {
      if (!isDragging) return;
      const touch = 'touches' in e ? e.touches[0] : e;
      handleMove(touch.clientX, touch.clientY);
    };

    const handleGlobalEnd = () => {
      if (isDragging) handleEnd();
    };

    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('mouseup', handleGlobalEnd);
    window.addEventListener('touchmove', handleGlobalMove);
    window.addEventListener('touchend', handleGlobalEnd);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleGlobalEnd);
      window.removeEventListener('touchmove', handleGlobalMove);
      window.removeEventListener('touchend', handleGlobalEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  return (
    <div
      ref={containerRef}
      className="joystick-base relative flex items-center justify-center touch-none select-none cursor-pointer"
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      {/* Grid lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-px h-full bg-dark-border/50" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-dark-border/50" />
      </div>

      {/* Handle */}
      <div
        className={cn(
          'joystick-handle transition-shadow',
          isDragging && 'glow-teal'
        )}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />

      {/* Values display */}
      <div className="absolute -bottom-8 text-xs text-dark-muted font-mono">
        X: {(position.x / maxRadius).toFixed(2)} | Y: {(-position.y / maxRadius).toFixed(2)}
      </div>
    </div>
  );
}

function RotationControl() {
  const { setRotation } = useRobotStore();

  return (
    <div className="flex items-center gap-4">
      <button
        onMouseDown={() => setRotation(-1)}
        onMouseUp={() => setRotation(0)}
        onTouchStart={() => setRotation(-1)}
        onTouchEnd={() => setRotation(0)}
        className="w-20 h-20 rounded-full bg-dark-bg border-2 border-dark-border flex items-center justify-center hover:border-kpatrol-500 transition-colors active:bg-kpatrol-500/20"
      >
        <RotateCcw className="w-8 h-8 text-kpatrol-400" />
      </button>

      <button
        onMouseDown={() => setRotation(1)}
        onMouseUp={() => setRotation(0)}
        onTouchStart={() => setRotation(1)}
        onTouchEnd={() => setRotation(0)}
        className="w-20 h-20 rounded-full bg-dark-bg border-2 border-dark-border flex items-center justify-center hover:border-kpatrol-500 transition-colors active:bg-kpatrol-500/20"
      >
        <RotateCw className="w-8 h-8 text-kpatrol-400" />
      </button>
    </div>
  );
}

function DirectionButton({ direction, icon }: { direction: string; icon: React.ReactNode }) {
  return (
    <button className="p-4 bg-dark-card border border-dark-border rounded-lg flex items-center justify-center hover:bg-dark-border hover:border-kpatrol-500/50 transition-colors active:bg-kpatrol-500/20">
      {icon}
    </button>
  );
}
