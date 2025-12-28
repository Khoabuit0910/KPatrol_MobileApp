'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { useRobotStore } from '@/store/robotStore';

interface SocketContextValue {
  isConnected: boolean;
  lastPing: number | null;
  connectionQuality: 'excellent' | 'good' | 'fair' | 'poor';
  connect: () => void;
  disconnect: () => void;
  send: (type: string, payload: unknown) => boolean;
  sendControl: (command: string, data?: unknown) => boolean;
  move: (direction: 'forward' | 'backward' | 'left' | 'right' | 'stop', speed?: number) => boolean;
  rotate: (direction: 'clockwise' | 'counter-clockwise', speed?: number) => boolean;
  setSpeed: (speed: number) => boolean;
  emergencyStop: () => boolean;
}

const SocketContext = createContext<SocketContextValue | null>(null);

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const { settings } = useRobotStore();
  const socket = useSocket({
    url: settings.serverUrl,
    autoConnect: settings.autoReconnect,
    reconnectAttempts: 5,
    reconnectInterval: 3000,
  });

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketContext() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }
  return context;
}
