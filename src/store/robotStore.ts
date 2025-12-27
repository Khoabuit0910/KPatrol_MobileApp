import { create } from 'zustand';

export interface RobotStatus {
  isConnected: boolean;
  batteryLevel: number;
  speed: number;
  temperature: number;
  cpuUsage: number;
  memoryUsage: number;
  uptime: number;
  lastUpdate: Date | null;
  position: {
    x: number;
    y: number;
    heading: number;
  };
  motors: {
    m1: number;
    m2: number;
    m3: number;
    m4: number;
  };
}

export interface ControlState {
  joystickX: number;
  joystickY: number;
  rotation: number;
  isManualMode: boolean;
}

interface RobotStore extends RobotStatus, ControlState {
  // Actions - Status
  setConnected: (connected: boolean) => void;
  updateStatus: (status: Partial<RobotStatus>) => void;
  
  // Actions - Control
  setJoystick: (x: number, y: number) => void;
  setRotation: (rotation: number) => void;
  setManualMode: (manual: boolean) => void;
  stopAll: () => void;
}

export const useRobotStore = create<RobotStore>((set) => ({
  // Initial Status
  isConnected: false,
  batteryLevel: 85,
  speed: 0,
  temperature: 42,
  cpuUsage: 35,
  memoryUsage: 48,
  uptime: 3600,
  lastUpdate: null,
  position: { x: 0, y: 0, heading: 0 },
  motors: { m1: 0, m2: 0, m3: 0, m4: 0 },

  // Initial Control
  joystickX: 0,
  joystickY: 0,
  rotation: 0,
  isManualMode: true,

  // Actions
  setConnected: (connected) => set({ isConnected: connected }),
  
  updateStatus: (status) => set((state) => ({
    ...state,
    ...status,
    lastUpdate: new Date(),
  })),

  setJoystick: (x, y) => set({ joystickX: x, joystickY: y }),
  
  setRotation: (rotation) => set({ rotation }),
  
  setManualMode: (manual) => set({ isManualMode: manual }),
  
  stopAll: () => set({
    joystickX: 0,
    joystickY: 0,
    rotation: 0,
    speed: 0,
    motors: { m1: 0, m2: 0, m3: 0, m4: 0 },
  }),
}));
