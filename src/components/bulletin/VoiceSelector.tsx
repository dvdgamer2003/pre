import React from 'react';

interface VoiceSelectorProps {
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  onVoiceChange: (voice: SpeechSynthesisVoice) => void;
}

export function VoiceSelector({ voices, selectedVoice, onVoiceChange }: VoiceSelectorProps) {
  return (
    <select
      value={selectedVoice?.name || ''}
      onChange={(e) => {
        const voice = voices.find(v => v.name === e.target.value);
        if (voice) onVoiceChange(voice);
      }}
      className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-primary"
    >
      {voices.map(voice => (
        <option key={voice.name} value={voice.name}>
          {voice.name} ({voice.lang})
        </option>
      ))}
    </select>
  );
}