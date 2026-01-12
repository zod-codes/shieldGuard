import { useState, useEffect, useRef, useMemo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  useMapContext,
  ZoomableGroup,
  type Coordinates
} from '@vnedyalk0v/react19-simple-maps';
import { Globe, Plus, Minus } from 'lucide-react';

interface HubData {
  coords: [number, number];
  name: string;
  country: string;
  x?: number;
  y?: number;
}

const HUBS = {
  dubai: { coords: [55.2708, 25.2048] as [number, number], name: "Dubai", country: "United Arab Emirates" },
  lagos: { coords: [3.3792, 6.5244] as [number, number], name: "Lagos", country: "Nigeria" },
  tokyo: { coords: [139.6503, 35.6762] as [number, number], name: "Tokyo", country: "Japan" },
  london: { coords: [-0.1276, 51.5072] as [number, number], name: "London", country: "United Kingdom" },
  moscow: { coords: [37.6173, 55.7558] as [number, number], name: "Moscow", country: "Russia" },
  beijing: { coords: [116.4074, 39.9042] as [number, number], name: "Beijing", country: "China" },
  newYork: { coords: [-74.006, 40.7128] as [number, number], name: "New York", country: "USA" },
  brasilia: { coords: [-47.8822, -15.7942] as [number, number], name: "Brasília", country: "Brazil" },
  canberra: { coords: [149.1287, -35.2820] as [number, number], name: "Canberra", country: "Australia" },
  capeTown: { coords: [18.4241, -33.9249] as [number, number], name: "Cape Town", country: "South Africa" },
  singapore: { coords: [103.8198, 1.3521] as [number, number], name: "Singapore", country: "Singapore" },
  addisAbaba: { coords: [38.7421, 9.0227] as [number, number], name: "Addis Ababa", country: "Ethiopia" },
  antananarivo: { coords: [47.5315, -18.8792] as [number, number], name: "Antananarivo", country: "Madagascar" },
};


// Helper: Calculate distance between two [lon, lat] points in KM
function getDistance(coord1: [number, number], coord2: [number, number]) {
  const R = 6371; // Earth's radius in km
  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

// Algorithm: Generate connections for nodes within X km of each other
function generateNearbyConnections(hubs: typeof HUBS, maxDistanceKM: number = 4000) {
  const connections: { id: string; from: [number, number]; to: [number, number] }[] = [];
  const entries = Object.entries(hubs);

  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const [id1, hub1] = entries[i];
      const [id2, hub2] = entries[j];

      const distance = getDistance(hub1.coords, hub2.coords);

      // If they are within the threshold, create a connection
      if (distance <= maxDistanceKM) {
        connections.push({
          id: `${id1}-${id2}`,
          from: hub1.coords,
          to: hub2.coords
        });
      }
    }
  }
  return connections;
}


function LogisticsArc({ from, to }: { from: [number, number], to: [number, number] }) {
  // Access the library's internal projection math
  const { projection } = useMapContext();

  // Project points
  const start = projection(from);
  const end = projection(to);

  if (!start || !end) return null;

  const [startX, startY] = start;
  const [endX, endY] = end;

  // Calculate a control point for the curve (Midpoint + offset)
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2 - 50; // The -50 "pulls" the line upward

  const d = `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;

  return (
    <path
      d={d}
      fill="none"
      stroke="rgba(96, 165, 250, 0.5)"
      strokeWidth="2"
      strokeDasharray="4 4" // Makes it a dashed line like a flight path
      className="animate-pulse"
    />
  );
}


export function MapSection() {
  const [geoData, setGeoData] = useState(null);
  const [position, setPosition] = useState({ coordinates: [0, -55] as Coordinates, zoom: 1 });
  const [hoveredHub, setHoveredHub] = useState<{ data: HubData, x: number, y: number } | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // 3. Generate the network connections (e.g., everything within 4500km)
  const network = useMemo(() => generateNearbyConnections(HUBS, 6500), []);

  useEffect(() => {
    // Using 50m resolution for a more professional, detailed look
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json")
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Map Load Error:", err));
  }, []);

  // ZOOM HANDLERS
  const handleZoomIn = () => {
    if (position.zoom >= 5) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  // Sync state if user pans/zooms with mouse
  const handleMoveEnd = (newPosition: { coordinates: Coordinates; zoom: number }) => {
    setPosition(newPosition);
  };

  const handleHover = (hub: HubData | null, e?: React.MouseEvent) => {
    if (!hub || !e || !mapContainerRef.current) {
      setHoveredHub(null);
      return;
    }

    // Get the exact mouse position relative to the map container
    const rect = mapContainerRef.current.getBoundingClientRect();
    setHoveredHub({
      data: hub,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section className="py-24 bg-slate-950 overflow-hidden relative">
      {/* Cinematic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            <Globe size={14} className="animate-spin-slow" /> Global Operations
          </div>
          <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight">Real-Time Network Map</h2>
        </div>

        <div className="relative w-full aspect-[21/9] bg-slate-900/40 rounded-3xl border border-white/5 backdrop-blur-sm overflow-hidden" ref={mapContainerRef}>
          {/* 3. ZOOM BUTTON UI */}
          <div className="absolute right-6 top-6 z-30 flex flex-col gap-2">
            <button
              onClick={handleZoomIn}
              className="p-2 bg-slate-950/80 border border-white/10 rounded-lg text-blue-400 hover:bg-slate-900 hover:text-white transition-colors backdrop-blur-md"
              title="Zoom In"
            >
              <Plus size={20} />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 bg-slate-950/80 border border-white/10 rounded-lg text-blue-400 hover:bg-slate-900 hover:text-white transition-colors backdrop-blur-md"
              title="Zoom Out"
            >
              <Minus size={20} />
            </button>
          </div>

          {/* THE TOOLTIP - Positioned absolutely relative to the map container */}
          {hoveredHub && hoveredHub.x !== undefined && hoveredHub.y !== undefined && (
            <div
              className="absolute z-50 pointer-events-none bg-slate-900/90 border border-blue-500/50 p-3 rounded-lg backdrop-blur-md shadow-2xl transition-all duration-200"
              style={{
                left: hoveredHub.x + 10,
                top: hoveredHub.y - 30,
                transform: 'translate(-60%, -100%)'
              }}
            >
              <div className="text-blue-400 text-[10px] font-mono uppercase tracking-widest mb-1">Active Locations</div>
              <div className="text-white font-bold">{hoveredHub.data.name}</div>
              <div className="text-white/60 text-xs">{hoveredHub.data.country}</div>
              {/* Tooltip Arrow */}
              <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45 border-r border-b border-blue-500/50" />
            </div>
          )}

          {geoData ? (
            <ComposableMap projectionConfig={{ scale: 120 }}>
              {/* ZoomableGroup enables panning in all directions */}
              <ZoomableGroup
                center={position.coordinates}
                zoom={position.zoom}
                onMoveEnd={handleMoveEnd}
                maxZoom={6}
              >
                {/* SVG Filters for the "Neon" effect */}
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <Geographies geography={geoData}>
                  {({ geographies }) =>
                    geographies.map((geo, i) => (
                      <Geography key={`${geo.rsmKey}_${i}`} geography={geo} fill="#1e293b" stroke="#334155" />
                    ))
                  }
                </Geographies>

                {/* 4. Render the dynamically generated network */}
                {network.map((conn) => (
                  <LogisticsArc
                    key={conn.id}
                    from={conn.from}
                    to={conn.to}
                  />
                ))}

                {/* DRAW THE MARKERS: The Marker component uses the projection internally */}
                {Object.entries(HUBS).map(([key, value]) => (
                  <Marker
                    key={key}
                    coordinates={value.coords as Coordinates}
                    onMouseEnter={(e) => handleHover(value, e)} // Pass the event to get mouse position
                    onMouseLeave={() => handleHover(null)}
                  >
                    <g className="cursor-pointer">
                      <circle r="6" fill="transparent" />
                      <circle r="3" fill="#60a5fa" className="animate-ping" />
                      <circle r="2" fill="white" />
                    </g>
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500 font-mono text-sm tracking-widest">
              INITIALIZING GLOBAL UPLINK...
            </div>
          )}

          {/* Technical HUD Overlay */}
          <div className="absolute bottom-6 left-6 bg-slate-950/80 border border-white/10 p-4 rounded-xl backdrop-blur-md hidden md:block">
            <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-mono mb-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              LIVE TELEMETRY ACTIVE
            </div>
            <div className="text-white/40 text-[9px] font-mono leading-relaxed">
              NODE_ID: 4882-X <br />
              TRAFFIC: OPTIMAL <br />
              LATENCY: 24ms
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}