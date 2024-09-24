import { Map as OlMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import { OSM } from "ol/source";
import { useEffect, useRef, useState } from "react";
import { Coordinate, sampleData } from "../utils";
import Marker from "./Marker";
import ZoomControls from "./ZoomControls";

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<OlMap | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinate[]>(sampleData);

  useEffect(() => {
    if (!mapRef.current) return;

    const initialMap = new OlMap({
      controls: [],
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

  const handleStatusChange = (index: number, newStatus: boolean) => {
    setCoordinates((prev) =>
      prev.map((coordinates, i) =>
        i === index ? { ...coordinates, status: newStatus } : coordinates
      )
    );
  };

  const handleDetailsChange = (index: number, newDetails: string) => {
    setCoordinates((prev) =>
      prev.map((coordinates, i) =>
        i === index ? { ...coordinates, details: newDetails } : coordinates
      )
    );
  };

  return (
    <div ref={mapRef} className="w-full h-full">
      {map && (
        <>
          {coordinates.map((coordinate, index) => (
            <Marker
              key={index}
              map={map}
              longitude={coordinate.longitude}
              latitude={coordinate.latitude}
              status={coordinate.status}
              details={coordinate.details}
              onStatusChange={(newStatus) =>
                handleStatusChange(index, newStatus)
              }
              onDetailsChange={(newDetails) =>
                handleDetailsChange(index, newDetails)
              }
            />
          ))}
          <ZoomControls map={map} />
        </>
      )}
    </div>
  );
};

export default Map;
