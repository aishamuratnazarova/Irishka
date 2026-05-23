import { useEffect, useState } from 'react';

export interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  speed: number;
  rotation: number;
  shape: 'circle' | 'heart' | 'star' | 'square';
  opacity: number;
}

interface ConfettiProps {
  active: boolean;
  onComplete?: () => void;
  x?: number; // Optional burst origin
  y?: number;
}

const PASTEL_COLORS = [
  '#FFB7B2', // Soft pink
  '#FFDAC1', // Soft peach
  '#E2F0CB', // Pale green
  '#B5EAD7', // Mint pastel
  '#C7CEEA', // Pale lavender
  '#FF9AA2', // Gentle blush
  '#FFB7B2',
  '#E8D7F1', // Lavender pink
  '#F3C6F1', // Sweet orchid
  '#FCE1E4', // Soft warm cream
];

export default function Confetti({ active, onComplete, x, y }: ConfettiProps) {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    if (!active) return;

    // Generate confetti particles
    const startX = x ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 300);
    const startY = y ?? (typeof window !== 'undefined' ? window.innerHeight / 2 : 300);

    const newParticles: ConfettiParticle[] = Array.from({ length: 60 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 12;
      const size = 8 + Math.random() * 14;
      const shapes: ('circle' | 'heart' | 'star' | 'square')[] = ['circle', 'heart', 'star', 'square'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];

      return {
        id: Date.now() + i,
        x: startX,
        y: startY,
        color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
        size,
        angle,
        speed,
        rotation: Math.random() * 360,
        shape,
        opacity: 1,
      };
    });

    setParticles(newParticles);

    // Gravity and physics animation loop
    let animationFrame: number;
    let elapsed = 0;

    const updatePhysics = () => {
      elapsed += 16;
      setParticles((prev) =>
        prev
          .map((p) => {
            // Apply air resistance, gravity
            const vx = Math.cos(p.angle) * p.speed;
            const vy = Math.sin(p.angle) * p.speed + (elapsed * 0.005); // gravitational pull down
            const nextX = p.x + vx;
            const nextY = p.y + vy;
            const nextOpacity = Math.max(0, 1 - elapsed / 2200);

            return {
              ...p,
              x: nextX,
              y: nextY,
              rotation: p.rotation + p.speed,
              opacity: nextOpacity,
            };
          })
          .filter((p) => p.opacity > 0)
      );

      if (elapsed < 2500) {
        animationFrame = requestAnimationFrame(updatePhysics);
      } else {
        setParticles([]);
        if (onComplete) onComplete();
      }
    };

    animationFrame = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [active, x, y, onComplete]);

  if (particles.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <svg width="100%" height="100%">
        {particles.map((p) => {
          const transform = `translate(${p.x}, ${p.y}) rotate(${p.rotation})`;
          if (p.shape === 'heart') {
            return (
              <path
                key={p.id}
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={p.color}
                opacity={p.opacity}
                transform={`${transform} scale(${p.size / 24})`}
              />
            );
          }
          if (p.shape === 'star') {
            return (
              <path
                key={p.id}
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill={p.color}
                opacity={p.opacity}
                transform={`${transform} scale(${p.size / 24})`}
              />
            );
          }
          if (p.shape === 'circle') {
            return (
              <circle
                key={p.id}
                cx={0}
                cy={0}
                r={p.size / 2}
                fill={p.color}
                opacity={p.opacity}
                transform={transform}
              />
            );
          }
          // Square / Rectangle
          return (
            <rect
              key={p.id}
              x={-p.size / 2}
              y={-p.size / 2}
              width={p.size}
              height={p.size}
              fill={p.color}
              opacity={p.opacity}
              transform={transform}
            />
          );
        })}
      </svg>
    </div>
  );
}
