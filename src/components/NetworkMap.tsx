import React, { memo, useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';
import { motion, AnimatePresence } from 'motion/react';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const markers = [
  { name: "New York", coordinates: [-74.006, 40.7128] as [number, number] },
  { name: "London", coordinates: [-0.1278, 51.5074] as [number, number] },
  { name: "Tokyo", coordinates: [139.6917, 35.6895] as [number, number] },
  { name: "San Francisco", coordinates: [-122.4194, 37.7749] as [number, number] },
  { name: "Paris", coordinates: [2.3522, 48.8566] as [number, number] },
  { name: "Singapore", coordinates: [103.8198, 1.3521] as [number, number] },
  { name: "Sydney", coordinates: [151.2093, -33.8688] as [number, number] },
  { name: "Berlin", coordinates: [13.4050, 52.5200] as [number, number] },
  { name: "Mumbai", coordinates: [72.8777, 19.0760] as [number, number] },
  { name: "São Paulo", coordinates: [-46.6333, -23.5505] as [number, number] },
  { name: "Cape Town", coordinates: [18.4232, -33.9249] as [number, number] },
  { name: "Toronto", coordinates: [-79.3832, 43.6532] as [number, number] },
  { name: "Seoul", coordinates: [126.9780, 37.5665] as [number, number] },
  { name: "Buenos Aires", coordinates: [-58.3816, -34.6037] as [number, number] },
  { name: "Nairobi", coordinates: [36.8219, -1.2921] as [number, number] },
  { name: "Tel Aviv", coordinates: [34.7818, 32.0853] as [number, number] },
  { name: "Dubai", coordinates: [55.2708, 25.2048] as [number, number] },
  { name: "Auckland", coordinates: [174.7633, -36.8485] as [number, number] },
  { name: "Mexico City", coordinates: [-99.1332, 19.4326] as [number, number] },
  { name: "Hong Kong", coordinates: [114.1694, 22.3193] as [number, number] },
  { name: "Bangalore", coordinates: [77.5946, 12.9716] as [number, number] },
  { name: "Amsterdam", coordinates: [4.9041, 52.3676] as [number, number] },
  { name: "Stockholm", coordinates: [18.0686, 59.3293] as [number, number] },
  { name: "Bogotá", coordinates: [-74.0721, 4.7110] as [number, number] },
  { name: "Lagos", coordinates: [3.3792, 6.5244] as [number, number] },
  { name: "Chicago", coordinates: [-87.6298, 41.8781] as [number, number] },
  { name: "Austin", coordinates: [-97.7431, 30.2672] as [number, number] },
  { name: "Seattle", coordinates: [-122.3321, 47.6062] as [number, number] },
  { name: "Vancouver", coordinates: [-123.1207, 49.2827] as [number, number] },
  { name: "Montreal", coordinates: [-73.5673, 45.5017] as [number, number] },
  { name: "Santiago", coordinates: [-70.6483, -33.4569] as [number, number] },
  { name: "Lima", coordinates: [-77.0428, -12.0464] as [number, number] },
  { name: "Madrid", coordinates: [-3.7038, 40.4168] as [number, number] },
  { name: "Rome", coordinates: [12.4964, 41.9028] as [number, number] },
  { name: "Vienna", coordinates: [16.3738, 48.2082] as [number, number] },
  { name: "Cairo", coordinates: [31.2357, 30.0444] as [number, number] },
  { name: "Johannesburg", coordinates: [28.0473, -26.2041] as [number, number] },
  { name: "Istanbul", coordinates: [28.9784, 41.0082] as [number, number] },
  { name: "Riyadh", coordinates: [46.6753, 24.7136] as [number, number] },
  { name: "Beijing", coordinates: [116.4074, 39.9042] as [number, number] },
  { name: "Shanghai", coordinates: [121.4737, 31.2304] as [number, number] },
  { name: "Taipei", coordinates: [121.5654, 25.0330] as [number, number] },
  { name: "Kuala Lumpur", coordinates: [101.6869, 3.1390] as [number, number] },
  { name: "Manila", coordinates: [120.9842, 14.5995] as [number, number] },
  { name: "Jakarta", coordinates: [106.8456, -6.2088] as [number, number] },
  { name: "Melbourne", coordinates: [144.9631, -37.8136] as [number, number] },
  { name: "Brisbane", coordinates: [153.0251, -27.4698] as [number, number] },
];

const connections = [
  ...[
    [markers[0], markers[1]], // NY to London
    [markers[1], markers[2]], // London to Tokyo
    [markers[3], markers[0]], // SF to NY
    [markers[2], markers[5]], // Tokyo to Singapore
    [markers[5], markers[4]], // Singapore to Paris
    [markers[6], markers[5]], // Sydney to Singapore
    [markers[8], markers[16]], // Mumbai to Dubai
    [markers[16], markers[1]], // Dubai to London
    [markers[11], markers[0]], // Toronto to NY
    [markers[9], markers[13]], // Sao Paulo to Buenos Aires
    [markers[14], markers[10]], // Nairobi to Cape Town
    [markers[12], markers[2]], // Seoul to Tokyo
    [markers[7], markers[1]], // Berlin to London
    [markers[18], markers[3]], // Mexico City to SF
    [markers[15], markers[4]], // Tel Aviv to Paris
    [markers[17], markers[6]], // Auckland to Sydney
    [markers[19], markers[2]], // Hong Kong to Tokyo
    [markers[20], markers[5]], // Bangalore to Singapore
    [markers[21], markers[1]], // Amsterdam to London
    [markers[22], markers[7]], // Stockholm to Berlin
    [markers[23], markers[18]], // Bogotá to Mexico City
    [markers[24], markers[10]], // Lagos to Cape Town
    [markers[25], markers[0]], // Chicago to NY
    [markers[26], markers[18]], // Austin to Mexico City
    [markers[27], markers[3]], // Seattle to SF
    [markers[28], markers[27]], // Vancouver to Seattle
    [markers[29], markers[11]], // Montreal to Toronto
    [markers[30], markers[9]], // Santiago to Sao Paulo
    [markers[31], markers[23]], // Lima to Bogota
    [markers[32], markers[4]], // Madrid to Paris
    [markers[33], markers[32]], // Rome to Madrid
    [markers[34], markers[7]], // Vienna to Berlin
    [markers[35], markers[15]], // Cairo to Tel Aviv
    [markers[36], markers[10]], // Johannesburg to Cape Town
    [markers[37], markers[33]], // Istanbul to Rome
    [markers[38], markers[16]], // Riyadh to Dubai
    [markers[39], markers[40]], // Beijing to Shanghai
    [markers[40], markers[19]], // Shanghai to Hong Kong
    [markers[41], markers[19]], // Taipei to Hong Kong
    [markers[42], markers[5]], // Kuala Lumpur to Singapore
    [markers[43], markers[41]], // Manila to Taipei
    [markers[44], markers[5]], // Jakarta to Singapore
    [markers[45], markers[6]], // Melbourne to Sydney
    [markers[46], markers[6]], // Brisbane to Sydney
  ]
];

const MapGeographies = memo(() => (
  <Geographies geography={geoUrl}>
    {({ geographies }) =>
      geographies.map((geo) => (
        <Geography
          key={geo.rsmKey}
          geography={geo}
          stroke="var(--text-secondary)"
          strokeWidth={0.5}
          strokeOpacity={0.2}
          fill="var(--bg-secondary)"
          style={{
            default: { outline: "none", transition: "all 250ms" },
            hover: { outline: "none", fill: "var(--bg-primary)", transition: "all 250ms" },
            pressed: { outline: "none" },
          }}
        />
      ))
    }
  </Geographies>
));

export function NetworkMap() {
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getProjectionConfig = () => {
    // A stable scale that works well within typical container aspect ratios
    return { scale: 120, center: [0, 20] as [number, number] };
  };

  return (
    <div className="absolute inset-0 overflow-hidden z-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-primary)] opacity-50 z-10 pointer-events-none" />
      <ComposableMap 
        projection="geoMercator" 
        projectionConfig={getProjectionConfig()}
        width={800}
        height={500}
        style={{ width: "100%", height: "100%", outline: "none", position: "absolute", top: 0, left: 0 }}
        className="z-0"
      >
        <MapGeographies />
        
        {connections.map(([start, end], i) => (
          <Line
            key={`line-${i}`}
            from={start.coordinates}
            to={end.coordinates}
            stroke="var(--accent)"
            strokeWidth={1}
            strokeLinecap="round"
            className="opacity-20 [stroke-dasharray:4_4] animate-[dash_10s_linear_infinite]"
          />
        ))}

        {markers.map(({ name, coordinates }, i) => (
          <Marker 
            key={name} 
            coordinates={coordinates}
            onMouseEnter={() => setHoveredMarker(name)}
            onMouseLeave={() => setHoveredMarker(null)}
            className="cursor-pointer"
          >
            <motion.circle 
              r={hoveredMarker === name ? 24 : 16} 
              fill="var(--accent)"
              initial={{ scale: 0, opacity: 0 }}
              animate={hoveredMarker === name ? { scale: 1.2, opacity: 0.5 } : { scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: hoveredMarker === name ? 0.3 : 3, repeat: Infinity, delay: i * 0.15 }}
              style={{ filter: "blur(4px)" }}
            />
            <motion.circle 
              r={hoveredMarker === name ? 8 : 5} 
              fill="var(--accent)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              style={{
                filter: "drop-shadow(0 0 8px var(--accent))"
              }}
            />
            <circle r={2} fill="#fff" />
            <AnimatePresence>
              {hoveredMarker === name && (
                <motion.g
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                >
                  <text
                    textAnchor="middle"
                    y={-14}
                    style={{
                      fontFamily: "ui-sans-serif, system-ui, sans-serif",
                      fontSize: "12px",
                      fill: "none",
                      stroke: "var(--bg-primary)",
                      strokeWidth: 4,
                      strokeLinejoin: "round",
                      fontWeight: 700,
                      pointerEvents: "none",
                    }}
                  >
                    {name}
                  </text>
                  <text
                    textAnchor="middle"
                    y={-14}
                    style={{
                      fontFamily: "ui-sans-serif, system-ui, sans-serif",
                      fontSize: "12px",
                      fill: "var(--text-primary)",
                      fontWeight: 700,
                      pointerEvents: "none",
                    }}
                  >
                    {name}
                  </text>
                </motion.g>
              )}
            </AnimatePresence>
          </Marker>
        ))}
      </ComposableMap>
      <style>
        {`
          @keyframes dash {
            to {
              stroke-dashoffset: -40;
            }
          }
        `}
      </style>
    </div>
  );
}
