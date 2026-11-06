'use client';

import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  speed: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export default function Starfield() {
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
      initStars();
    };

    window.addEventListener('resize', handleResize);

    const starCount = Math.min(180, Math.floor((width * height) / 8000));
    const stars: Star[] = [];
    const colors = ['#ffffff', '#ffd9e8', '#e9d5ff', '#fed7aa', '#fbcfe8'];

    function initStars() {
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        const baseAlpha = Math.random() * 0.7 + 0.2;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.6,
          alpha: baseAlpha,
          baseAlpha,
          speed: Math.random() * 0.02 + 0.005,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    initStars();

    const shootingStars: ShootingStar[] = [];
    function spawnShootingStar() {
      if (Math.random() < 0.015 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 80 + 50,
          speed: Math.random() * 6 + 6,
          angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
          alpha: 1,
          active: true,
        });
      }
    }

    let time = 0;

    function render() {
      time += 0.02;
      ctx!.clearRect(0, 0, width, height);

      // Draw subtle background ambient nebulae
      const gradient1 = ctx!.createRadialGradient(
        width * 0.2,
        height * 0.3,
        50,
        width * 0.2,
        height * 0.3,
        width * 0.5
      );
      gradient1.addColorStop(0, 'rgba(46, 16, 68, 0.25)');
      gradient1.addColorStop(1, 'rgba(10, 7, 18, 0)');
      ctx!.fillStyle = gradient1;
      ctx!.fillRect(0, 0, width, height);

      const gradient2 = ctx!.createRadialGradient(
        width * 0.8,
        height * 0.7,
        50,
        width * 0.8,
        height * 0.7,
        width * 0.45
      );
      gradient2.addColorStop(0, 'rgba(80, 14, 38, 0.2)');
      gradient2.addColorStop(1, 'rgba(10, 7, 18, 0)');
      ctx!.fillStyle = gradient2;
      ctx!.fillRect(0, 0, width, height);

      // Render Stars with twinkling
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.alpha = star.baseAlpha + Math.sin(time * star.speed * 80 + i) * 0.25;
        if (star.alpha < 0.1) star.alpha = 0.1;
        if (star.alpha > 1) star.alpha = 1;

        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx!.fillStyle = star.color;
        ctx!.globalAlpha = star.alpha;
        ctx!.shadowBlur = star.size > 1.4 ? 6 : 2;
        ctx!.shadowColor = star.color;
        ctx!.fill();
      }

      ctx!.shadowBlur = 0;

      // Render Shooting Stars
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        if (!s.active) continue;

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const starGrad = ctx!.createLinearGradient(tailX, tailY, s.x, s.y);
        starGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        starGrad.addColorStop(1, `rgba(255, 215, 240, ${s.alpha})`);

        ctx!.beginPath();
        ctx!.moveTo(tailX, tailY);
        ctx!.lineTo(s.x, s.y);
        ctx!.strokeStyle = starGrad;
        ctx!.lineWidth = 1.8;
        ctx!.globalAlpha = s.alpha;
        ctx!.stroke();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.015;

        if (s.alpha <= 0 || s.x > width || s.y > height) {
          shootingStars.splice(i, 1);
        }
      }

      ctx!.globalAlpha = 1;
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
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
}
