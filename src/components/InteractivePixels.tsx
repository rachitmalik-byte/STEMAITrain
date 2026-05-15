import { useEffect, useRef } from 'react';

export function InteractivePixels() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const numParticles = 80;
    let animationFrameId: number;

    // Track mouse position relative to window
    const mouse = { x: -1000, y: -1000 };
    let targetMouse = { x: -1000, y: -1000 };
    const mouseTrail: {x: number, y: number}[] = [];
    const trailLength = 20;

    const initCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        // Handle high DPI displays for crisp rendering
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
      }
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseX: number;
      baseY: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.size = Math.random() * 1.5 + 0.5;
      }

      update(width: number, height: number, hoverX: number, hoverY: number) {
        // Normal random movement
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges continuously
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;

        // Mouse interaction (Repulsion / "Displacement" to simulate intelligence fields)
        const dx = hoverX - this.x;
        const dy = hoverY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const interactionRadius = 150;
        if (distance < interactionRadius) {
          const distSafe = distance || 0.1;
          const forceDirectionX = dx / distSafe;
          const forceDirectionY = dy / distSafe;
          const force = (interactionRadius - distSafe) / interactionRadius;
          
          this.x -= forceDirectionX * force * 5.0;
          this.y -= forceDirectionY * force * 5.0;
        }

        // Return slightly to base velocity naturally
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 1) {
          this.vx *= 0.95;
          this.vy *= 0.95;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 95, 31, 0.4)'; // var(--accent) #FF5F1F
        ctx.fill();
        
        // Slight glow core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(rect.width, rect.height));
      }
    };

    const drawGrid = (w: number, h: number) => {
      ctx.beginPath();
      for(let i=0; i<w; i+=100) {
         ctx.moveTo(i, 0);
         ctx.lineTo(i, h);
      }
      for(let i=0; i<h; i+=100) {
         ctx.moveTo(0, i);
         ctx.lineTo(w, i);
      }
      ctx.strokeStyle = 'rgba(255, 95, 31, 0.03)';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const w = rect.width;
      const h = rect.height;

      // Interpolate mouse for smooth transitions
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;

      // Calculate mouse relative to canvas
      const canvasRect = canvas.getBoundingClientRect();
      const hoverX = mouse.x - canvasRect.left;
      const hoverY = mouse.y - canvasRect.top;

      mouseTrail.unshift({ x: hoverX, y: hoverY });
      if (mouseTrail.length > trailLength) {
        mouseTrail.pop();
      }

      ctx.clearRect(0, 0, w, h);

      // Draw faint structural grid
      drawGrid(w, h);

      // Update and draw particles
      particles.forEach(p => {
        p.update(w, h, hoverX, hoverY);
        p.draw();
      });

      const time = performance.now() * 0.001;

      // Draw Network Point-to-Point Connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            
            // Add a subtle smooth wave to the line
            const distSafe = distance || 0.1;
            const waveOffset = Math.sin(time * 2 + particles[i].baseX * 0.01 + particles[j].baseY * 0.01) * 8;
            const nx = -dy / distSafe;
            const ny = dx / distSafe;
            
            const midX = (particles[i].x + particles[j].x) / 2 + nx * waveOffset;
            const midY = (particles[i].y + particles[j].y) / 2 + ny * waveOffset;
            
            ctx.quadraticCurveTo(midX, midY, particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 95, 31, ${0.15 * (1 - distance / 130)})`;
            ctx.stroke();
          }
        }
      }

      // Draw Connections to Mouse cursor
      if (hoverX > 0 && hoverX < w && hoverY > 0 && hoverY < h) {
        particles.forEach(p => {
          const dx = p.x - hoverX;
          const dy = p.y - hoverY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 180) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            
            // Wavy distortion to mouse
            const distSafe = distance || 0.1;
            const waveOffset = Math.sin(time * 3 + p.baseX * 0.02) * 12;
            const nx = -dy / distSafe;
            const ny = dx / distSafe;
            
            const mMidX = (p.x + hoverX) / 2 + nx * waveOffset;
            const mMidY = (p.y + hoverY) / 2 + ny * waveOffset;
            
            ctx.quadraticCurveTo(mMidX, mMidY, hoverX, hoverY);
            
            // More intense line stroke color as it nears cursor
            ctx.strokeStyle = `rgba(255, 95, 31, ${0.25 * (1 - distance / 180)})`;
            ctx.stroke();
          }
        });

        // Draw animated ribbon trailing the mouse
        if (mouseTrail.length > 2) {
          ctx.beginPath();
          ctx.moveTo(mouseTrail[0].x, mouseTrail[0].y);
          for (let i = 1; i < mouseTrail.length - 1; i++) {
            const xc = (mouseTrail[i].x + mouseTrail[i + 1].x) / 2;
            const yc = (mouseTrail[i].y + mouseTrail[i + 1].y) / 2;
            ctx.quadraticCurveTo(mouseTrail[i].x, mouseTrail[i].y, xc, yc);
          }
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          // Gradient stroke for ribbon trail
          const gradient = ctx.createLinearGradient(
            mouseTrail[0].x, mouseTrail[0].y, 
            mouseTrail[mouseTrail.length - 1].x, mouseTrail[mouseTrail.length - 1].y
          );
          gradient.addColorStop(0, 'rgba(255, 95, 31, 0.4)');
          gradient.addColorStop(1, 'rgba(255, 95, 31, 0)');
          ctx.strokeStyle = gradient;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      initCanvas();
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    initCanvas();
    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-multiply dark:mix-blend-screen opacity-100 transition-opacity duration-1000">
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Decorative gradient masks to fade out effect at edges */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--bg-primary)] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--bg-primary)] to-transparent pointer-events-none" />
      
      {/* Subtle organic light blooms */}
      <div className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[var(--accent)] rounded-full blur-[150px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[10%] left-[5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-blue-500 rounded-full blur-[120px] opacity-[0.02] dark:opacity-[0.03] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }} />
    </div>
  );
}
