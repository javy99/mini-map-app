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
    element.className =
      "bg-[rgba(0,0,0,0.75)] text-white p-5 rounded shadow-lg w-[350px]";

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
      <h3 className="font-bold mb-5 text-lg">Marker Details</h3>
      <div className="mb-4">
        <label className="flex items-center gap-5">
          <span className="font-semibold">Status:</span>
          <select
            value={localStatus ? "true" : "false"}
            onChange={(e) => setLocalStatus(e.target.value === "true")}
            className="bg-[rgba(0,0,0,0.2)] w-full border border-gray-300 rounded-md p-1 outline-none transition cursor-pointer"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span className="font-semibold">Details:</span>
          <textarea
            value={localDetails}
            onChange={(e) => setLocalDetails(e.target.value)}
            className="bg-[rgba(0,0,0,0.2)]  mt-2 w-full border border-gray-200 rounded-md p-3 outline-none transition resize-none"
            rows={4}
            placeholder="Enter marker details..."
          />
        </label>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="border border-white text-white px-3 py-2 rounded-md hover:bg-gray-200 hover:text-black transition-all shadow-sm"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="border border-white text-white px-3 py-2 rounded-md hover:bg-gray-200 hover:text-black transition-all shadow-sm"
        >
          Save
        </button>
      </div>
    </>,
    popupElement
  );
};

export default MarkerPopup;
