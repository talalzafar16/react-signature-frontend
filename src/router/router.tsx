import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Map from "../pages/Map";
// import ExcelListing from "../pages/ExcelListing";
// import DisplayExcelData from "@/pages/DisplayExcelData";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "@/pages/NotFound";
// import LatLongFinderMap from "@/pages/LatLongFinderMap";
import AnotherMap from "@/pages/AnotherMap";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/auth/login" element={<Login />} />
        <Route path="/" element={<Map />} />
        {/* <Route path="/LatLongFinderMap" element={<LatLongFinderMap />} /> */}
        <Route path="/admin/LatLongEntryMap" element={<AnotherMap />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin/home/*" element={<Home />} />
          {/* <Route path="/excelListing" element={<ExcelListing />} />
          <Route path="/displayExcelData/:id" element={<DisplayExcelData />} /> */}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
