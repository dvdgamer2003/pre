import { useState, useCallback } from 'react';

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [supported] = useState('speechSynthesis' in window);

  const speak = useCallback((text: string) => {
    if (!supported) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure speech parameters for news reporter style
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.1; // Slightly higher pitch for professionalism
    utterance.volume = 1.0;
    
    // Try to use a professional-sounding voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      voice => voice.name.includes('Daniel') || // Premium voice on some systems
              voice.name.includes('Alex') ||    // Professional male voice
              voice.name.includes('Samantha')   // Professional female voice
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Event handlers
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [supported]);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  return {
    speak,
    stop,
    speaking,
    supported
  };
}