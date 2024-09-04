import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Map from "../pages/Map";
import PropertyManagement from "../pages/PropertyManagement";
import ExcelListing from "../pages/ExcelListing";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/map" element={<Map />} />
        <Route path="/propertyManagement" element={<PropertyManagement />} />
        <Route path="/excelListing" element={<ExcelListing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
