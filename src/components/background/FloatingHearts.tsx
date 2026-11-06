'use client';

import React, { useEffect, useRef } from 'react';

interface FloatingHeart {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
  wobble: number;
}

export default function FloatingHearts() {
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

    const hearts: FloatingHeart[] = [];
    const heartColors = [
      '#ff4d88', // neon rose
      '#c084fc', // glowing lavender
      '#fb7185', // soft rose
      '#f43f5e', // deep rose
      '#fcd34d', // warm gold
    ];

    // Spawn periodic ambient hearts
    function spawnAmbientHeart() {
      if (hearts.length < 25 && Math.random() < 0.05) {
        hearts.push({
          x: Math.random() * width,
          y: height + 20,
          size: Math.random() * 8 + 6,
          speedY: Math.random() * 1.0 + 0.6,
          speedX: (Math.random() - 0.5) * 0.6,
          opacity: Math.random() * 0.4 + 0.3,
          color: heartColors[Math.floor(Math.random() * heartColors.length)],
          wobble: Math.random() * Math.PI * 2,
        });
      }
    }

    // Interactive click to spawn hearts
    const handleClick = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      for (let i = 0; i < 6; i++) {
        hearts.push({
          x: clientX + (Math.random() * 30 - 15),
          y: clientY + (Math.random() * 30 - 15),
          size: Math.random() * 10 + 8,
          speedY: Math.random() * 2 + 1.2,
          speedX: (Math.random() - 0.5) * 2.5,
          opacity: 0.9,
          color: heartColors[Math.floor(Math.random() * heartColors.length)],
          wobble: Math.random() * Math.PI * 2,
        });
      }
    };

    window.addEventListener('click', handleClick);

    function drawHeart(x: number, y: number, size: number, color: string, alpha: number) {
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.globalAlpha = alpha;
      ctx!.fillStyle = color;
      ctx!.shadowBlur = 10;
      ctx!.shadowColor = color;

      ctx!.beginPath();
      const topCurveHeight = size * 0.3;
      ctx!.moveTo(0, topCurveHeight);
      // top left curve
      ctx!.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      // bottom left curve
      ctx!.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.15);
      // bottom right curve
      ctx!.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      // top right curve
      ctx!.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx!.fill();

      ctx!.restore();
    }

    function render() {
      ctx!.clearRect(0, 0, width, height);
      spawnAmbientHeart();

      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.wobble += 0.04;
        h.x += Math.sin(h.wobble) * 0.8 + h.speedX;
        h.y -= h.speedY;
        h.opacity -= 0.003;

        drawHeart(h.x, h.y, h.size, h.color, Math.max(0, h.opacity));

        if (h.y < -30 || h.opacity <= 0) {
          hearts.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-15"
      style={{ opacity: 0.9 }}
    />
  );
}
