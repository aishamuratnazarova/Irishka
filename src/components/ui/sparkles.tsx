import React, { useEffect, useRef } from 'react';

interface SparklesCoreProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
  speed?: number;
}

export function SparklesCore({
  id = 'sparkles',
  background = 'transparent',
  minSize = 0.4,
  maxSize = 1.2,
  particleDensity = 120,
  className = '',
  particleColor = '#F2A7B5',
  speed = 0.5,
}: SparklesCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
    }> = [];

    // Calculate count based on density
    const count = Math.max(10, Math.floor((width * height * particleDensity) / 500000));

    // Create particles
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * speed * 0.5,
        speedY: -(Math.random() * speed + 0.1), // move upwards
        opacity: Math.random(),
        fadeSpeed: 0.005 + Math.random() * 0.015,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        // Update positions
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity -= p.fadeSpeed;

        // Reset offscreen particles
        if (p.y < 0 || p.opacity <= 0 || p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
          p.y = height + Math.random() * 10;
          p.opacity = 0.9;
          p.speedX = (Math.random() - 0.5) * speed * 0.5;
          p.speedY = -(Math.random() * speed + 0.1);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.parentElement?.offsetHeight || 300;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [minSize, maxSize, particleDensity, particleColor, speed]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={`w-full h-full block ${className}`}
      style={{ background }}
    />
  );
}
