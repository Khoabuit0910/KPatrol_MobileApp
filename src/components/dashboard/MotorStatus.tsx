'use client';

import { useRobotStore } from '@/store/robotStore';
import { cn } from '@/lib/utils';

export function MotorStatus() {
  const { motors } = useRobotStore();

  const motorList = [
    { id: 'M1', label: 'Trước Trái', value: motors.m1 },
    { id: 'M2', label: 'Trước Phải', value: motors.m2 },
    { id: 'M3', label: 'Sau Trái', value: motors.m3 },
    { id: 'M4', label: 'Sau Phải', value: motors.m4 },
  ];

  return (
    <div className="space-y-4">
      {/* Robot Visualization */}
      <div className="relative w-48 h-48 mx-auto">
        {/* Robot body */}
        <div className="absolute inset-4 border-2 border-dark-border rounded-lg bg-dark-bg/50" />
        
        {/* Direction indicator */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-kpatrol-500" />
        
        {/* Wheels */}
        {[
          { pos: 'top-8 left-2', motor: motors.m1 },
          { pos: 'top-8 right-2', motor: motors.m2 },
          { pos: 'bottom-8 left-2', motor: motors.m3 },
          { pos: 'bottom-8 right-2', motor: motors.m4 },
        ].map((wheel, i) => (
          <div
            key={i}
            className={cn(
              'absolute w-6 h-12 rounded-md transition-colors duration-200',
              wheel.pos,
              wheel.motor > 0 ? 'bg-status-online' :
              wheel.motor < 0 ? 'bg-status-warning' :
              'bg-dark-border'
            )}
          />
        ))}
      </div>

      {/* Motor Values */}
      <div className="grid grid-cols-2 gap-3">
        {motorList.map((motor) => (
          <div key={motor.id} className="bg-dark-bg rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-dark-muted">{motor.id}</span>
              <span className="text-xs text-dark-muted">{motor.label}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={cn(
                'text-lg font-mono font-bold',
                motor.value > 0 ? 'text-status-online' :
                motor.value < 0 ? 'text-status-warning' :
                'text-dark-muted'
              )}>
                {motor.value > 0 ? '+' : ''}{motor.value}
              </span>
              <div className="w-16 h-2 bg-dark-border rounded-full overflow-hidden">
                <div 
                  className={cn(
                    'h-full transition-all duration-200',
                    motor.value >= 0 ? 'bg-status-online' : 'bg-status-warning'
                  )}
                  style={{ 
                    width: `${Math.abs(motor.value) / 255 * 100}%`,
                    marginLeft: motor.value < 0 ? 'auto' : 0
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
