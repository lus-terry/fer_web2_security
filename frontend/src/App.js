import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SensitiveDataExposureExample from "./components/SensitiveDataExposureExample";
import XSSExample from "./components/XSSExample";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/sensitive_data_exposure-example"
            element={<SensitiveDataExposureExample />}
          />
          <Route path="/xss-example" element={<XSSExample />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
