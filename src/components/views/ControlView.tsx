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
  ArrowRight,
  Gamepad2,
  Move,
  Gauge,
  Power,
  Home,
  Navigation,
  Crosshair
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';

type ControlMode = 'joystick' | 'dpad';

export function ControlView() {
  const [controlMode, setControlMode] = useState<ControlMode>('joystick');
  const [speedLevel, setSpeedLevel] = useState(50);
  const { isConnected, speed, joystickX, joystickY, stopAll } = useRobotStore();

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Control Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-kpatrol-500/20 rounded-lg">
            <Gamepad2 className="w-5 h-5 text-kpatrol-400" />
          </div>
          <div>
            <h2 className="font-semibold text-dark-text">Điều khiển Robot</h2>
            <p className="text-sm text-dark-muted">Chế độ: {controlMode === 'joystick' ? 'Joystick' : 'D-Pad'}</p>
          </div>
        </div>
        <StatusBadge status={isConnected ? 'online' : 'offline'} />
      </div>

      {/* Control Mode Toggle */}
      <div className="flex items-center gap-2 p-1 bg-dark-surface rounded-lg">
        <button 
          onClick={() => setControlMode('joystick')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all',
            controlMode === 'joystick' 
              ? 'bg-kpatrol-500 text-white shadow-glow-sm' 
              : 'text-dark-muted hover:text-dark-text'
          )}
        >
          <Crosshair className="w-4 h-4" />
          Joystick
        </button>
        <button 
          onClick={() => setControlMode('dpad')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all',
            controlMode === 'dpad' 
              ? 'bg-kpatrol-500 text-white shadow-glow-sm' 
              : 'text-dark-muted hover:text-dark-text'
          )}
        >
          <Gamepad2 className="w-4 h-4" />
          D-Pad
        </button>
      </div>

      {/* Main Control Area */}
      <div className="flex-1 grid md:grid-cols-2 gap-4">
        {/* Movement Control */}
        <Card variant="glow" className="p-6 flex flex-col items-center justify-center min-h-[300px]">
          <div className="flex items-center gap-2 mb-4">
            <Move className="w-4 h-4 text-kpatrol-400" />
            <span className="text-sm text-dark-muted">Di chuyển</span>
          </div>
          
          {controlMode === 'joystick' ? (
            <Joystick />
          ) : (
            <DPad />
          )}
        </Card>

        {/* Rotation Control */}
        <Card variant="glow" className="p-6 flex flex-col items-center justify-center min-h-[300px]">
          <div className="flex items-center gap-2 mb-4">
            <RotateCw className="w-4 h-4 text-accent-400" />
            <span className="text-sm text-dark-muted">Xoay</span>
          </div>
          <RotationControl />
          
          {/* Speed Display */}
          <div className="mt-6 w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-dark-muted">Tốc độ hiện tại</span>
              <span className="text-sm font-medium text-kpatrol-400">{speed.toFixed(1)} m/s</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-dark-muted">Joystick X</span>
              <span className="text-sm font-mono text-dark-text">{joystickX.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-dark-muted">Joystick Y</span>
              <span className="text-sm font-mono text-dark-text">{joystickY.toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Speed Control */}
      <Card variant="glow" className="p-4">
        <div className="flex items-center gap-4">
          <Gauge className="w-5 h-5 text-kpatrol-400" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-dark-muted">Mức tốc độ tối đa</span>
              <Badge variant="primary">{speedLevel}%</Badge>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="10"
              value={speedLevel}
              onChange={(e) => setSpeedLevel(Number(e.target.value))}
              className="w-full h-2 bg-dark-border rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-kpatrol-500 [&::-webkit-slider-thumb]:shadow-glow-sm"
            />
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <Button variant="secondary" className="flex-col py-4 h-auto">
          <Home className="w-5 h-5 mb-1" />
          <span className="text-xs">Về Home</span>
        </Button>
        <Button variant="secondary" className="flex-col py-4 h-auto">
          <Navigation className="w-5 h-5 mb-1" />
          <span className="text-xs">Tuần tra</span>
        </Button>
        <Button variant="secondary" className="flex-col py-4 h-auto">
          <Power className="w-5 h-5 mb-1" />
          <span className="text-xs">Sạc pin</span>
        </Button>
      </div>

      {/* Emergency Stop */}
      <Button 
        variant="danger" 
        size="lg" 
        className="w-full py-5 text-lg"
        onClick={stopAll}
      >
        <StopCircle className="w-6 h-6" />
        DỪNG KHẨN CẤP
      </Button>
    </div>
  );
}

function Joystick() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const { setJoystick } = useRobotStore();

  const maxRadius = 70;

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
  }, [setJoystick, maxRadius]);

  const handleStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
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
      e.preventDefault();
      const touch = 'touches' in e ? e.touches[0] : e;
      handleMove(touch.clientX, touch.clientY);
    };

    const handleGlobalEnd = () => {
      if (isDragging) handleEnd();
    };

    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('mouseup', handleGlobalEnd);
    window.addEventListener('touchmove', handleGlobalMove, { passive: false });
    window.addEventListener('touchend', handleGlobalEnd);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleGlobalEnd);
      window.removeEventListener('touchmove', handleGlobalMove);
      window.removeEventListener('touchend', handleGlobalEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  const distance = Math.sqrt(position.x * position.x + position.y * position.y);
  const intensity = (distance / maxRadius) * 100;

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="joystick-base relative flex items-center justify-center touch-none select-none cursor-pointer"
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        {/* Outer ring indicator */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-dark-border/50" />
        
        {/* Cross guides */}
        <div className="absolute inset-4 flex items-center justify-center pointer-events-none">
          <div className="w-px h-full bg-dark-border/30" />
        </div>
        <div className="absolute inset-4 flex items-center justify-center pointer-events-none">
          <div className="w-full h-px bg-dark-border/30" />
        </div>

        {/* Direction indicators */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-dark-muted/50">↑</div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-dark-muted/50">↓</div>
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-dark-muted/50">←</div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-dark-muted/50">→</div>

        {/* Handle */}
        <div
          className={cn(
            'joystick-handle transition-all duration-75',
            isDragging && 'active scale-110'
          )}
          style={{
            top: `calc(50% + ${position.y}px)`,
            left: `calc(50% + ${position.x}px)`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Crosshair className="w-6 h-6 text-white/80" />
        </div>
      </div>

      {/* Intensity indicator */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs text-dark-muted">Cường độ:</span>
        <div className="flex-1">
          <Progress value={intensity} size="sm" variant="default" />
        </div>
        <span className="text-xs font-mono text-kpatrol-400">{intensity.toFixed(0)}%</span>
      </div>
    </div>
  );
}

function DPad() {
  const { setJoystick } = useRobotStore();
  const [activeDirection, setActiveDirection] = useState<string | null>(null);

  const handlePress = (direction: string, x: number, y: number) => {
    setActiveDirection(direction);
    setJoystick(x, y);
  };

  const handleRelease = () => {
    setActiveDirection(null);
    setJoystick(0, 0);
  };

  const DirectionBtn = ({ 
    direction, 
    x, 
    y, 
    icon, 
    className 
  }: { 
    direction: string; 
    x: number; 
    y: number; 
    icon: React.ReactNode;
    className?: string;
  }) => (
    <button
      onMouseDown={() => handlePress(direction, x, y)}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}
      onTouchStart={() => handlePress(direction, x, y)}
      onTouchEnd={handleRelease}
      className={cn(
        'w-16 h-16 rounded-xl bg-dark-surface border-2 border-dark-border flex items-center justify-center transition-all',
        'hover:border-kpatrol-500/50 active:bg-kpatrol-500/20 active:border-kpatrol-500',
        activeDirection === direction && 'bg-kpatrol-500/20 border-kpatrol-500 shadow-glow-sm',
        className
      )}
    >
      {icon}
    </button>
  );

  return (
    <div className="relative w-52 h-52">
      {/* Up */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2">
        <DirectionBtn direction="up" x={0} y={1} icon={<ArrowUp className="w-6 h-6 text-kpatrol-400" />} />
      </div>
      
      {/* Down */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <DirectionBtn direction="down" x={0} y={-1} icon={<ArrowDown className="w-6 h-6 text-kpatrol-400" />} />
      </div>
      
      {/* Left */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2">
        <DirectionBtn direction="left" x={-1} y={0} icon={<ArrowLeft className="w-6 h-6 text-kpatrol-400" />} />
      </div>
      
      {/* Right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        <DirectionBtn direction="right" x={1} y={0} icon={<ArrowRight className="w-6 h-6 text-kpatrol-400" />} />
      </div>

      {/* Center indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-12 h-12 rounded-full bg-dark-card border-2 border-dark-border flex items-center justify-center">
          <div className={cn(
            'w-3 h-3 rounded-full transition-colors',
            activeDirection ? 'bg-kpatrol-500' : 'bg-dark-border'
          )} />
        </div>
      </div>

      {/* Diagonal buttons */}
      <div className="absolute top-4 left-4">
        <DirectionBtn direction="up-left" x={-0.7} y={0.7} icon={<ArrowUp className="w-4 h-4 text-dark-muted -rotate-45" />} className="w-12 h-12" />
      </div>
      <div className="absolute top-4 right-4">
        <DirectionBtn direction="up-right" x={0.7} y={0.7} icon={<ArrowUp className="w-4 h-4 text-dark-muted rotate-45" />} className="w-12 h-12" />
      </div>
      <div className="absolute bottom-4 left-4">
        <DirectionBtn direction="down-left" x={-0.7} y={-0.7} icon={<ArrowDown className="w-4 h-4 text-dark-muted rotate-45" />} className="w-12 h-12" />
      </div>
      <div className="absolute bottom-4 right-4">
        <DirectionBtn direction="down-right" x={0.7} y={-0.7} icon={<ArrowDown className="w-4 h-4 text-dark-muted -rotate-45" />} className="w-12 h-12" />
      </div>
    </div>
  );
}

function RotationControl() {
  const { setRotation, rotation } = useRobotStore();
  const [isRotating, setIsRotating] = useState<'left' | 'right' | null>(null);

  const handleRotateStart = (direction: 'left' | 'right') => {
    setIsRotating(direction);
    setRotation(direction === 'left' ? -1 : 1);
  };

  const handleRotateEnd = () => {
    setIsRotating(null);
    setRotation(0);
  };

  return (
    <div className="flex items-center gap-6">
      <button
        onMouseDown={() => handleRotateStart('left')}
        onMouseUp={handleRotateEnd}
        onMouseLeave={handleRotateEnd}
        onTouchStart={() => handleRotateStart('left')}
        onTouchEnd={handleRotateEnd}
        className={cn(
          'w-20 h-20 rounded-full bg-dark-surface border-2 border-dark-border flex items-center justify-center transition-all',
          'hover:border-accent-500/50',
          isRotating === 'left' && 'bg-accent-500/20 border-accent-500 shadow-glow-sm'
        )}
      >
        <RotateCcw className={cn(
          'w-8 h-8 transition-colors',
          isRotating === 'left' ? 'text-accent-400' : 'text-dark-muted'
        )} />
      </button>

      {/* Rotation indicator */}
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full border-2 border-dark-border flex items-center justify-center">
          <div 
            className="w-1 h-4 bg-kpatrol-500 rounded-full origin-bottom transition-transform"
            style={{ transform: `rotate(${rotation * 45}deg)` }}
          />
        </div>
        <span className="text-xs text-dark-muted mt-1">
          {rotation === 0 ? '0°' : rotation > 0 ? 'CW' : 'CCW'}
        </span>
      </div>

      <button
        onMouseDown={() => handleRotateStart('right')}
        onMouseUp={handleRotateEnd}
        onMouseLeave={handleRotateEnd}
        onTouchStart={() => handleRotateStart('right')}
        onTouchEnd={handleRotateEnd}
        className={cn(
          'w-20 h-20 rounded-full bg-dark-surface border-2 border-dark-border flex items-center justify-center transition-all',
          'hover:border-accent-500/50',
          isRotating === 'right' && 'bg-accent-500/20 border-accent-500 shadow-glow-sm'
        )}
      >
        <RotateCw className={cn(
          'w-8 h-8 transition-colors',
          isRotating === 'right' ? 'text-accent-400' : 'text-dark-muted'
        )} />
      </button>
    </div>
  );
}
