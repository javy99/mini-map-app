import { Feature, Map } from "ol";
import BaseEvent from "ol/events/Event";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import { useCallback, useEffect, useState } from "react";
import active from "/active.svg";
import inactive from "/inactive.svg";
import MarkerPopup from "./MarkerPopup";

let openPopup: Feature | null = null;

const CLOSE_POPUP_EVENT = Symbol("closePopup");

interface Props {
  map: Map;
  longitude: number;
  latitude: number;
  status: boolean;
  details: string;
  onStatusChange: (newStatus: boolean) => void;
  onDetailsChange: (newDetails: string) => void;
}

const Marker: React.FC<Props> = ({
  map,
  longitude,
  latitude,
  status,
  details,
  onDetailsChange,
  onStatusChange,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = useCallback(() => {
    setShowPopup(false);
    openPopup = null;
  }, []);

  useEffect(() => {
    const marker = new Feature({
      geometry: new Point(fromLonLat([longitude, latitude])),
    });

    const markerStyle = new Style({
      image: new Icon({
        src: status ? active : inactive,
        scale: 0.04,
      }),
    });

    marker.setStyle(markerStyle);

    const vectorSource = new VectorSource({
      features: [marker],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(vectorLayer);

    const handleClick = (event: any) => {
      map.forEachFeatureAtPixel(event.pixel, (feature) => {
        if (feature === marker) {
          if (openPopup && openPopup !== marker) {
            map.dispatchEvent(new BaseEvent(CLOSE_POPUP_EVENT as any));
          }
          setShowPopup(true);
          openPopup = marker;
          return true;
        }
        return false;
      });
    };

    map.on("pointermove", (event) => {
      const pixel = map.getEventPixel(event.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      map.getTargetElement().style.cursor = hit ? "pointer" : "";
    });

    map.on("click", handleClick);

    const closePopupListener = () => {
      if (openPopup === marker) {
        closePopup();
      }
    };
    map.on(CLOSE_POPUP_EVENT as any, closePopupListener);

    return () => {
      map.removeLayer(vectorLayer);
      map.un("click", handleClick);
      map.un(CLOSE_POPUP_EVENT as any, closePopupListener);
    };
  }, [map, longitude, latitude, status, closePopup]);

  return (
    showPopup && (
      <MarkerPopup
        map={map}
        coordinate={fromLonLat([longitude, latitude])}
        status={status}
        details={details}
        onStatusChange={onStatusChange}
        onDetailsChange={onDetailsChange}
        onClose={closePopup}
      />
    )
  );
};

export default Marker;
