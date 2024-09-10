import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Map from "../pages/Map";
import PropertyManagement from "../pages/PropertyManagement";
import ExcelListing from "../pages/ExcelListing";
import SignUp from "../pages/SignUp";
import DisplayExcelData from "@/pages/DisplayExcelData";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home/*" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/map" element={<Map />} />
        <Route path="/propertyManagement" element={<PropertyManagement />} />
        <Route path="/excelListing" element={<ExcelListing />} />
        <Route path="/displayExcelData/:id" element={<DisplayExcelData />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
