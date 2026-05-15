import { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';

export function GlobeMap() {
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    setIsDark(document.documentElement.classList.contains('dark'));
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let phi = 0;
    
    // Hex to RGB normalized
    const baseColor = isDark ? [1, 1, 1] as [number, number, number] : [0.3, 0.3, 0.3] as [number, number, number];
    const glowColor = isDark ? [0.1, 0.1, 0.1] as [number, number, number] : [0.95, 0.95, 0.95] as [number, number, number];
    const markerColor = [255/255, 95/255, 31/255] as [number, number, number]; // var(--accent) #FF5F1F

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0.1, 
      dark: isDark ? 1 : 0, 
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: baseColor,
      markerColor: markerColor,
      glowColor: glowColor,
      markers: [
        { location: [37.7595, -122.4367], size: 0.08 }, // SF
        { location: [40.7128, -74.006], size: 0.08 }, // NY
        { location: [51.5072, -0.1276], size: 0.06 },  // London
        { location: [48.8566, 2.3522], size: 0.05 },   // Paris
        { location: [35.6895, 139.6917], size: 0.1 },  // Tokyo
        { location: [1.3521, 103.8198], size: 0.07 },  // Singapore
        { location: [28.6139, 77.209], size: 0.09 },   // Delhi
        { location: [31.2304, 121.4737], size: 0.08 }, // Shanghai
        { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
        { location: [41.3851, 2.1734], size: 0.04 },    // Barcelona
        { location: [43.6532, -79.3832], size: 0.06 },  // Toronto
        { location: [37.5665, 126.9780], size: 0.06 },  // Seoul
        { location: [30.2672, -97.7431], size: 0.05 },  // Austin
      ],
      // @ts-ignore: cobe types might be missing onRender
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phi += 0.005;
        }
        phi += pointerInteractionMovement.current;
        state.phi = phi;
        pointerInteractionMovement.current *= 0.93; // Friction
      },
    });

    return () => {
      globe.destroy();
    };
  }, [isDark]);

  return (
    <div 
      className="w-full max-w-[500px] aspect-square mx-auto relative"
      onPointerDown={(e) => {
        pointerInteracting.current = e.clientX;
      }}
      onPointerUp={() => {
        pointerInteracting.current = null;
      }}
      onPointerOut={() => {
        pointerInteracting.current = null;
      }}
      onMouseMove={(e) => {
        if (pointerInteracting.current !== null) {
          const delta = e.clientX - pointerInteracting.current;
          pointerInteractionMovement.current = delta * 0.005;
          pointerInteracting.current = e.clientX;
        }
      }}
      onTouchMove={(e) => {
        if (pointerInteracting.current !== null && e.touches[0]) {
          const delta = e.touches[0].clientX - pointerInteracting.current;
          pointerInteractionMovement.current = delta * 0.005;
          pointerInteracting.current = e.touches[0].clientX;
        }
      }}
    >
      <div className="absolute inset-0 bg-[var(--accent)] opacity-[0.02] rounded-full blur-[50px] pointer-events-none" />
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-100 transition-opacity duration-1000 ease-in-out cursor-grab active:cursor-grabbing"
        style={{
          contain: 'layout paint size',
        }}
      />
    </div>
  );
}
