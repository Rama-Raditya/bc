import React, { useState, useRef, useEffect } from 'react';
import Envelope from './components/Envelope';
import Letter from './components/Letter';
import Cake from './components/Cake';
import Finale from './components/Finale';
import { AppStage } from './types';
import { Volume2, VolumeX } from 'lucide-react';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.ENVELOPE);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Audio URL dari Pixabay - Solo Piano Thanksgiving Day Holiday
  const AUDIO_URL = "https://cdn.pixabay.com/download/audio/2022/08/09/audio_170989ad77.mp3"; 

  // Stop audio when reaching Finale
  useEffect(() => {
    if (stage === AppStage.FINALE) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsMuted(true);
    }
  }, [stage]);

  const handleEnvelopeOpen = () => {
    setStage(AppStage.LETTER);
    // Try to play audio when user interacts (opens envelope)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4; // Set volume to 40%
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Audio playing successfully");
            })
            .catch(error => {
              console.log("Audio play error:", error);
            });
        }
      }
    }, 500);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  const renderStage = () => {
    switch (stage) {
      case AppStage.ENVELOPE:
        return <Envelope onOpen={handleEnvelopeOpen} />;
      case AppStage.LETTER:
        return <Letter onNext={() => setStage(AppStage.CAKE)} />;
      case AppStage.CAKE:
        return <Cake onComplete={() => setStage(AppStage.FINALE)} />;
      case AppStage.FINALE:
        return <Finale />;
      default:
        return null;
    }
  };

  return (
    <main className="w-full h-screen overflow-hidden relative bg-pink-50">
      <audio 
        ref={audioRef} 
        loop
        crossOrigin="anonymous"
      >
        <source src={AUDIO_URL} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Audio Control Button - Hidden at Finale */}
      {stage !== AppStage.ENVELOPE && stage !== AppStage.FINALE && (
        <button 
          onClick={toggleAudio}
          className="fixed top-4 right-4 z-50 bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white/80 transition-all"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-gray-700" /> : <Volume2 className="w-5 h-5 text-pink-600" />}
        </button>
      )}

      {renderStage()}
    </main>
  );
};

export default App;