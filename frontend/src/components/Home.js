import React from "react";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center gap-y-4">
      <button
        style={{ width: "300px" }}
        className="bg-gray-400 hover:bg-gray-500 text-black font-bold text-sm py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        onClick={() => navigate("/xss-example")}
      >
        XSS Example
      </button>
      <button
        style={{ width: "300px" }}
        className="bg-gray-400 hover:bg-gray-500 text-black font-bold text-sm py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        onClick={() => navigate("/sensitive_data_exposure-example")}
      >
        Sensitive Data Exposure Example
      </button>
    </div>
  );
}

export default Home;
