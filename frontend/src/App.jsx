import { Outlet } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Toaster position="top-right" />
      {/* Global Navbar */}
      <Navbar />
      
      {/* Page Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
