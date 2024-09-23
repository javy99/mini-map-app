import { Map } from "./components";

const App: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-black text-white p-5">
        <h1 className="text-2xl font-bold">Interactive Map Application</h1>
      </header>
      <main className="flex-grow relative">
        <Map />
      </main>
    </div>
  );
};

export default App;
