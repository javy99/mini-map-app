import React from "react";
import { Map as OlMap } from "ol";

interface Props {
  map: OlMap;
}

const ZoomControls: React.FC<Props> = ({ map }) => {
  const handleZoomIn = () => {
    const view = map.getView();
    const zoom = view.getZoom();
    view.animate({ zoom: zoom! + 0.5 });
  };

  const handleZoomOut = () => {
    const view = map.getView();
    const zoom = view.getZoom();
    view.animate({ zoom: zoom! - 0.5 });
  };

  return (
    <div className="absolute bottom-5 right-5 flex flex-col space-y-2">
      <button
        onClick={handleZoomIn}
        title="Zoom In"
        className="bg-[rgba(0,0,0,0.6)] p-2 rounded-full shadow-md hover:bg-[rgba(0,0,0,0.8)] focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
      <button
        onClick={handleZoomOut}
        title="Zoom Out"
        className="bg-[rgba(0,0,0,0.6)] p-2 rounded-full shadow-md hover:bg-[rgba(0,0,0,0.8)] focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4"
          />
        </svg>
      </button>
    </div>
  );
};

export default ZoomControls;
