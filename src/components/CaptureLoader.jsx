import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const CaptureLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [theDisplay, setTheDisplay] = useState("flex");
  const navigate = useNavigate();
  return (
    <>
      {isLoading && <Loader />}
      <div
        style={{ display: theDisplay }}
        className="fixed top-0 left-0 z-50 w-full h-full  items-center justify-center bg-gray-900 bg-opacity-75"
      >
        <div>
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          <div className="text-white text-center font-dmsans my-3 text-2xl">
            Capturing...
          </div>
        </div>
      </div>
    </>
  );
};

export default CaptureLoader;
