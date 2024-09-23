import { Map as OlMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useEffect, useRef } from "react";

import "ol/ol.css";

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new OlMap({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: mapRef.current,
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    return () => map.setTarget(undefined);
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default Map;
