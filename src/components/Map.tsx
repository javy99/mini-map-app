import { Map as OlMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import { OSM } from "ol/source";
import { useEffect, useRef, useState } from "react";
import Marker from "./Marker";
import { sampleData } from "../utils";

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<OlMap | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initialMap = new OlMap({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: mapRef.current,
      view: new View({
        center: fromLonLat([58.7, 25.0]),
        zoom: 7,
      }),
    });

    setMap(initialMap);

    return () => initialMap.setTarget(undefined);
  }, []);

  return (
    <div ref={mapRef} className="w-full h-full">
      {map &&
        sampleData.map((coordinate, index) => (
          <Marker
            key={index}
            map={map}
            longitude={coordinate.longitude}
            latitude={coordinate.latitude}
            status={coordinate.status}
          />
        ))}
    </div>
  );
};

export default Map;
