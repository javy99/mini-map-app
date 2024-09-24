import { Map, Overlay } from "ol";
import { Coordinate } from "ol/coordinate";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface MarkerPopupProps {
  map: Map;
  coordinate: Coordinate;
  status: boolean;
  details: string;
  onStatusChange: (newStatus: boolean) => void;
  onDetailsChange: (newDetails: string) => void;
  onClose: () => void;
}

const MarkerPopup: React.FC<MarkerPopupProps> = ({
  map,
  coordinate,
  status,
  details,
  onStatusChange,
  onDetailsChange,
  onClose,
}) => {
  const [localStatus, setLocalStatus] = useState(status);
  const [localDetails, setLocalDetails] = useState(details);
  const [popupElement, setPopupElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = document.createElement("div");
    element.className = "bg-white p-6 rounded shadow-lg w-[350px]";

    const newOverlay = new Overlay({
      element,
      positioning: "bottom-center",
      stopEvent: true,
      offset: [0, -10],
    });

    map.addOverlay(newOverlay);
    newOverlay.setPosition(coordinate);
    setPopupElement(element);

    return () => {
      map.removeOverlay(newOverlay);
    };
  }, [map, coordinate]);

  const handleSave = () => {
    onStatusChange(localStatus);
    onDetailsChange(localDetails);
    onClose();
  };

  if (!popupElement) return null;

  return ReactDOM.createPortal(
    <>
      <h3 className="font-bold mb-2">Marker Details</h3>
      <div className="mb-2">
        <label className="flex align-middle gap-2">
          Status:
          <select
            value={localStatus ? "true" : "false"}
            onChange={(e) => setLocalStatus(e.target.value === "true")}
            className="ml-2 border rounded cursor-pointer"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </label>
      </div>
      <div className="mb-2">
        <label className="block">
          Details:
          <textarea
            value={localDetails}
            onChange={(e) => setLocalDetails(e.target.value)}
            className="w-full border rounded p-2 mt-2"
            rows={3}
          />
        </label>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </>,
    popupElement
  );
};

export default MarkerPopup;
