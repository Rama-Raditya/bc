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

  // A sweet, cheerful instrumental happy birthday track
  const AUDIO_URL = "https://pixabay.com/music/download/music-1139.mp3"; 

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
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // Set volume to 40%
      audioRef.current.play().catch(e => console.log("Audio autoplay blocked until interaction", e));
    }
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
      <audio ref={audioRef} loop>
        <source src={AUDIO_URL} type="audio/mpeg" />
      </audio>

      {/* Audio Control Button - Hidden at Finale */}
      {stage !== AppStage.ENVELOPE && stage !== AppStage.FINALE && (
        <button 
          onClick={toggleAudio}
          className="fixed top-4 right-4 z-50 bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white/80 transition-all"
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-gray-700" /> : <Volume2 className="w-5 h-5 text-pink-600" />}
        </button>
      )}

      {renderStage()}
    </main>
  );
};

export default App;