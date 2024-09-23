import { Feature, Map } from "ol";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import { useEffect } from "react";

interface Props {
  map: Map;
  longitude: number;
  latitude: number;
  status: boolean;
}

const Marker: React.FC<Props> = ({ map, longitude, latitude, status }) => {
  useEffect(() => {
    const marker = new Feature({
      geometry: new Point(fromLonLat([longitude, latitude])),
    });

    const markerStyle = new Style({
      image: new CircleStyle({
        radius: 8,
        fill: new Fill({ color: status ? "green" : "red" }),
        stroke: new Stroke({ color: "white", width: 2 }),
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

    return () => {
      map.removeLayer(vectorLayer);
    };
  }, [map, longitude, latitude, status]);

  return null;
};

export default Marker;
