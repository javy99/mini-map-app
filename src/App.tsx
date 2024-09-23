const App: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-black text-white p-5">
        <h1 className="text-2xl font-bold">Interactive Map Application</h1>
      </header>
      <main className="flex-grow relative">
        <div className="h-full bg-gray-200 flex items-center justify-center">
          <p className="text-xl">Map will be rendered here</p>
        </div>
      </main>
    </div>
  );
};

export default App;
