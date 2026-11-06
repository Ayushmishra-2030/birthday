'use client';

import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  sway: number;
  swaySpeed: number;
  color: string;
}

export default function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const petalColors = [
      '#e11d48', // rose 600
      '#be123c', // rose 700
      '#fb7185', // rose 400
      '#fda4af', // rose 300
      '#9f1239', // deep burgundy
      '#f43f5e', // rose 500
    ];

    const petalCount = Math.min(35, Math.floor(width / 35));
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 8 + 6,
        speedX: Math.random() * 0.8 - 0.4,
        speedY: Math.random() * 1.2 + 0.8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.5 + 0.35,
        sway: 0,
        swaySpeed: Math.random() * 0.03 + 0.01,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }

    function drawPetal(x: number, y: number, size: number, rotation: number, color: string, alpha: number) {
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate((rotation * Math.PI) / 180);
      ctx!.globalAlpha = alpha;
      ctx!.fillStyle = color;

      ctx!.beginPath();
      ctx!.moveTo(0, 0);
      ctx!.bezierCurveTo(-size, -size * 1.5, -size * 1.8, size * 0.8, 0, size * 1.8);
      ctx!.bezierCurveTo(size * 1.8, size * 0.8, size, -size * 1.5, 0, 0);
      ctx!.fill();

      // Subtle petal vein highlight
      ctx!.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx!.lineWidth = 0.8;
      ctx!.beginPath();
      ctx!.moveTo(0, 0);
      ctx!.lineTo(0, size * 1.2);
      ctx!.stroke();

      ctx!.restore();
    }

    function render() {
      ctx!.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.sway += p.swaySpeed;
        p.x += Math.sin(p.sway) * 1.2 + p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        drawPetal(p.x, p.y, p.size, p.rotation, p.color, p.opacity);

        // Respawn from top when out of screen
        if (p.y > height + 50 || p.x < -50 || p.x > width + 50) {
          p.x = Math.random() * width;
          p.y = -30;
          p.opacity = Math.random() * 0.5 + 0.35;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.8 }}
    />
  );
}
