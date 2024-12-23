import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';

interface SpeakButtonProps {
  text: string;
}

export function SpeakButton({ text }: SpeakButtonProps) {
  const { speak, stop, speaking, supported } = useSpeech();

  if (!supported) return null;

  const handleClick = () => {
    if (speaking) {
      stop();
    } else {
      speak(text);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-full backdrop-blur-md bg-white/90 text-gray-600 hover:bg-gray-100/90 transition-colors"
      title={speaking ? 'Stop speaking' : 'Listen to headline'}
    >
      {speaking ? (
        <VolumeX className="w-5 h-5" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </button>
  );
}