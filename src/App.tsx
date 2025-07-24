import Header from "./components/common/Header";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <div className="dashboard-container min-h-screen">
      <Header />
      <main className="pb-16">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
