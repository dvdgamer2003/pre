import { useState, useEffect, useCallback } from 'react';
import { usePreferences } from './usePreferences';
import type { RegionCode } from '@/types/regions';

const REGION_VOICE_PREFERENCES: Record<RegionCode, string[]> = {
  us: ['en-US'],
  gb: ['en-GB'],
  in: ['en-IN', 'hi-IN'],
  au: ['en-AU'],
  ca: ['en-CA', 'fr-CA'],
  fr: ['fr-FR'],
  de: ['de-DE'],
  jp: ['ja-JP'],
};

export function useNewsBulletin() {
  const { preferences } = usePreferences();
  const [speaking, setSpeaking] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const updateVoiceForRegion = useCallback((region: RegionCode) => {
    const voices = window.speechSynthesis.getVoices();
    const preferredLangs = REGION_VOICE_PREFERENCES[region];
    
    // Find a voice matching the region's language preferences
    const regionVoice = voices.find(voice => 
      preferredLangs.some(lang => voice.lang.startsWith(lang))
    );
    
    if (regionVoice) {
      setSelectedVoice(regionVoice);
    }
  }, []);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      
      if (preferences?.region) {
        updateVoiceForRegion(preferences.region as RegionCode);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [preferences?.region, updateVoiceForRegion]);

  const stopBulletin = useCallback(() => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const playHeadlines = useCallback((headlines: string[]) => {
    stopBulletin();

    let currentIndex = 0;

    const speakNext = () => {
      if (currentIndex >= headlines.length) {
        setSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(headlines[currentIndex]);
      
      utterance.rate = speed;
      utterance.pitch = 1.1;
      utterance.volume = 1.0;
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onend = () => {
        currentIndex++;
        speakNext();
      };

      utterance.onerror = () => {
        setSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    };

    setSpeaking(true);
    speakNext();
  }, [selectedVoice, speed, stopBulletin]);

  return {
    speaking,
    speed,
    setSpeed,
    selectedVoice,
    availableVoices,
    playHeadlines,
    stopBulletin,
    updateVoiceForRegion
  };
}