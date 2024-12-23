import React from 'react';
import { FastForward } from 'lucide-react';

interface SpeedControlProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export function SpeedControl({ speed, onSpeedChange }: SpeedControlProps) {
  const speeds = [0.75, 1, 1.25, 1.5, 2];

  return (
    <div className="flex items-center gap-2">
      <FastForward className="w-4 h-4 text-gray-500" />
      <select
        value={speed}
        onChange={(e) => onSpeedChange(Number(e.target.value))}
        className="px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-primary"
      >
        {speeds.map(s => (
          <option key={s} value={s}>
            {s}x
          </option>
        ))}
      </select>
    </div>
  );
}