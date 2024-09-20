import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Map from "../pages/Map";
import ExcelListing from "../pages/ExcelListing";
import DisplayExcelData from "@/pages/DisplayExcelData";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "@/pages/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home/*" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/excelListing" element={<ExcelListing />} />
          <Route path="/displayExcelData/:id" element={<DisplayExcelData />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
