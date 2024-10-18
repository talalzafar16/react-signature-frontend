import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import DisplayProperties from "./DisplayProperties";
import AddProperty from "./AddProperty";
import Settings from "./Settings";
import Sidebar from "@/components/Sidebar";
import DisplaySellers from "./DisplaySellers";


const Home = () => {
  
  return (
    <div className="flex overflow-y-hidden">
      <div className="w-1/5 max-lg:hidden">
        <Sidebar />
      </div>

      <div className="w-4/5 max-lg:w-full h-screen overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="listings" element={<DisplayProperties />} />
          <Route path="addProperty" element={<AddProperty />} />
          <Route path="settings" element={<Settings />} />
          <Route path="sellers" element={<DisplaySellers />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
