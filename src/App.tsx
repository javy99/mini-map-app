import React, { useEffect } from "react";
import Map from "./components/Map";
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

  const syncData = async () => {
    // This is where you would implement your sync logic
    // For example, sending any changes made while offline to your server
    console.log("Syncing data...");
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Data synced successfully");
  };

  useEffect(() => {
    if (!isOffline) {
      syncData();
    }
  }, [isOffline]);

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-black text-white p-4">
        <h1 className="text-2xl font-bold">Interactive Map Application</h1>
        {isOffline && (
          <div className="bg-yellow-500 text-black px-2 py-1 rounded mt-2">
            You are currently offline. Changes will be saved locally.
            <button
              className="ml-2 bg-white text-yellow-500 px-2 py-1 rounded hover:bg-yellow-400"
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
