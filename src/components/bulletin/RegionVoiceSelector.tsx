import React from 'react';
import { Globe } from 'lucide-react';
import { REGIONS, type RegionCode } from '@/types/regions';

interface RegionVoiceSelectorProps {
  selectedRegion: RegionCode;
  onRegionChange: (region: RegionCode) => void;
}

export function RegionVoiceSelector({ selectedRegion, onRegionChange }: RegionVoiceSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-500" />
      <select
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value as RegionCode)}
        className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-primary"
      >
        {Object.entries(REGIONS).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}