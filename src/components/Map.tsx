import { Map as OlMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import { XYZ } from "ol/source";
import { useEffect, useRef, useState } from "react";
import { Coordinate, IndexedDBTileCache } from "../utils";
import Marker from "./Marker";
import ZoomControls from "./ZoomControls";

interface Props {
  coordinates: Coordinate[];
  onStatusChange: (index: number, newStatus: boolean) => void;
  onDetailsChange: (index: number, newDetails: string) => void;
  isOffline: boolean;
}

const Map: React.FC<Props> = ({
  coordinates,
  onStatusChange,
  onDetailsChange,
  isOffline,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<OlMap | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const customTileLoadFunction = async (imageTile: any, src: string) => {
      if (isOffline) {
        const cachedTile = await IndexedDBTileCache.getTile(src);
        if (cachedTile) {
          imageTile.getImage().src = URL.createObjectURL(cachedTile);
          return;
        }
      }

      imageTile.getImage().src = src;
      if (!isOffline) {
        fetch(src)
          .then((response) => response.blob())
          .then((blob) => IndexedDBTileCache.setTile(src, blob));
      }
    };

    const tileSource = new XYZ({
      url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      tileLoadFunction: customTileLoadFunction,
    });

    const initialMap = new OlMap({
      controls: [],
      layers: [
        new TileLayer({
          source: tileSource,
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
  }, [isOffline]);

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
              onStatusChange={(newStatus) => onStatusChange(index, newStatus)}
              onDetailsChange={(newDetails) =>
                onDetailsChange(index, newDetails)
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
