import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import DisplayProperties from "./DisplayProperties";
import AddProperty from "./AddProperty";
import Settings from "./Settings";
import Sidebar from "@/components/Sidebar";

const Home = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
      <Sidebar/>
      </div>

      <div className="w-3/4 h-screen p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="listings" element={<DisplayProperties />} />
          <Route path="addProperty" element={<AddProperty />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
