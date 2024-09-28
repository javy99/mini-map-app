import React from "react";
const Map = React.lazy(() => import("./components/Map"));
import useLocalStorage from "./hooks/useLocalStorage";
import useOfflineStatus from "./hooks/useOfflineStatus";
import { Coordinate, sampleData } from "./utils";

const App: React.FC = () => {
  const isOffline = useOfflineStatus();
  const [coordinates, setCoordinates] = useLocalStorage<Coordinate[]>(
    "mapCoordinates",
    sampleData
  );

  const handleStatusChange = (index: number, newStatus: boolean) => {
    setCoordinates((prev) =>
      prev.map((coordinate, i) =>
        i === index ? { ...coordinate, status: newStatus } : coordinate
      )
    );
  };

  const handleDetailsChange = (index: number, newDetails: string) => {
    setCoordinates((prev) =>
      prev.map((coordinate, i) =>
        i === index ? { ...coordinate, details: newDetails } : coordinate
      )
    );
  };

  const handleRefresh = () => {
    if (!navigator.onLine) {
      window.location.reload();
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="fixed top-0 left-0 w-full bg-[rgba(0,0,0,0.7)] text-white p-4 z-10 flex gap-3 justify-between align-middle flex-wrap">
        <h1
          data-testid="cypress-title"
          className="text-xl md:text-2xl leading-none"
        >
          Interactive Map Application
        </h1>
        {isOffline && (
          <div className="bg-[rgba(255,0,0,0.6)] px-4 py-2 rounded flex flex-col md:flex-row justify-between items-center w-full md:w-auto gap-2">
            <span className="mt-0.5 text-center">
              You are currently offline. Please check your internet connection!
            </span>
            <button
              className="ml-0 md:ml-5 bg-white text-red-700 px-2 py-1 rounded hover:bg-slate-100 whitespace-nowrap"
              onClick={handleRefresh}
            >
              Refresh
            </button>
          </div>
        )}
      </header>
      <main className="flex-grow">
        <Map
          coordinates={coordinates}
          onStatusChange={handleStatusChange}
          onDetailsChange={handleDetailsChange}
          isOffline={isOffline}
        />
      </main>
    </div>
  );
};

export default App;
