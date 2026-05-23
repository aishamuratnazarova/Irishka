import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Music, Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalIdRef = useRef<number | null>(null);
  const [currentNoteName, setCurrentNoteName] = useState('Cozy Mix');

  // Happy Birthday Melodic Notes & Durations (C4 = 261.63, D4 = 293.66, etc.)
  const NOTES = [
    { freq: 261.63, dur: 0.4, name: 'C4' }, // С днём
    { freq: 261.63, dur: 0.2, name: 'C4' }, // рож -
    { freq: 293.66, dur: 0.6, name: 'D4' }, // де -
    { freq: 261.63, dur: 0.6, name: 'C4' }, // нья
    { freq: 349.23, dur: 0.6, name: 'F4' }, // те -
    { freq: 329.63, dur: 1.2, name: 'E4' }, // бя,
    
    { freq: 261.63, dur: 0.4, name: 'C4' }, // С днём
    { freq: 261.63, dur: 0.2, name: 'C4' }, // рож -
    { freq: 293.66, dur: 0.6, name: 'D4' }, // де -
    { freq: 261.63, dur: 0.6, name: 'C4' }, // нья
    { freq: 392.00, dur: 0.6, name: 'G4' }, // те -
    { freq: 349.23, dur: 1.2, name: 'F4' }, // бя,

    { freq: 261.63, dur: 0.4, name: 'C4' }, // С днём
    { freq: 261.63, dur: 0.2, name: 'C4' }, // рож -
    { freq: 523.25, dur: 0.6, name: 'C5' }, // де -
    { freq: 440.00, dur: 0.6, name: 'A4' }, // нья,
    { freq: 349.23, dur: 0.6, name: 'F4' }, // до -
    { freq: 329.63, dur: 0.6, name: 'E4' }, // ро -
    { freq: 293.66, dur: 0.8, name: 'D4' }, // га -
    
    { freq: 466.16, dur: 0.4, name: 'A#4' }, // я
    { freq: 466.16, dur: 0.2, name: 'A#4' }, // под -
    { freq: 440.00, dur: 0.6, name: 'A4' }, // ру -
    { freq: 349.23, dur: 0.6, name: 'F4' }, // га,
    { freq: 392.00, dur: 0.6, name: 'G4' }, // лю -
    { freq: 349.23, dur: 1.5, name: 'F4' }, // бя!
  ];

  const playSynthesizerNote = (freq: number, duration: number) => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    
    // Create soft sine oscillator for lofi chime
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    // Lowpass filter for cozy warm tone
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, ctx.currentTime);

    // Warm gain envelope avoiding clicks (fade-in & long-fade-out decay)
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    // Sub-bass warm pad accompanying
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(freq / 2, ctx.currentTime);
    subGain.gain.setValueAtTime(0, ctx.currentTime);
    subGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);
    subGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration * 1.5);

    // Connecting paths
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);

    osc.start();
    subOsc.start();

    osc.stop(ctx.currentTime + duration);
    subOsc.stop(ctx.currentTime + duration * 1.5);
  };

  const startSongLoop = () => {
    if (typeof window === 'undefined') return;
    
    // Initialize AudioContext lazily
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }
    
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    let noteIndex = 0;
    
    const playNextNote = () => {
      if (!isPlaying) return;
      
      const note = NOTES[noteIndex];
      playSynthesizerNote(note.freq, note.dur * 1.8);
      setCurrentNoteName(`🎵 Лоу-фай чилл...`);
      
      const delay = note.dur * 1250; // Milliseconds delay
      noteIndex = (noteIndex + 1) % NOTES.length;
      
      intervalIdRef.current = window.setTimeout(playNextNote, delay);
    };

    playNextNote();
  };

  useEffect(() => {
    if (isPlaying) {
      startSongLoop();
    } else {
      if (intervalIdRef.current) {
        clearTimeout(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    }
    
    return () => {
      if (intervalIdRef.current) clearTimeout(intervalIdRef.current);
    };
  }, [isPlaying]);

  const toggleMusic = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-6 right-6 z-40 bg-white/95 backdrop-blur-md border border-amber-100/60 p-3 rounded-2xl shadow-lg flex items-center gap-3"
      style={{
        boxShadow: '0 10px 25px -5px rgba(220, 190, 175, 0.2)'
      }}
    >
      {/* Vinyl Disc Style Image element */}
      <div className="relative h-10 w-10 bg-stone-800 rounded-full flex items-center justify-center overflow-hidden border border-stone-700">
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
          className="w-full h-full rounded-full flex items-center justify-center"
          style={{
            backgroundImage: 'repeating-radial-gradient(circle, #2d2d2d, #1a1a1a 2px, #2d2d2d 4px)'
          }}
        >
          {/* Central sticker */}
          <div className="h-4 w-4 rounded-full bg-rose-200 border border-white flex items-center justify-center">
            <div className="h-1 w-1 rounded-full bg-stone-800" />
          </div>
        </motion.div>
        
        {isPlaying && (
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
          </span>
        )}
      </div>

      {/* Track info & play button */}
      <div className="flex flex-col">
        <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest flex items-center gap-1">
          {isPlaying && <Sparkles className="w-2.5 h-2.5 text-rose-400 animate-bounce" />}
          Музыкальный подарок
        </span>
        <span className="text-xs font-medium text-stone-700 truncate max-w-[110px]">
          {isPlaying ? currentNoteName : 'Фоновая музыка'}
        </span>
      </div>

      <button
        onClick={toggleMusic}
        className={`h-8 w-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
          isPlaying ? 'bg-rose-100 text-rose-600' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
        }`}
        title={isPlaying ? 'Выключить' : 'Включить атмосферную музыку'}
      >
        {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>
    </motion.div>
  );
}
