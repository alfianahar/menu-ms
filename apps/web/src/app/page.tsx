"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  const callNestApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL + "/api" : "/api"}/`
      );
      setApiResponse(response.data);
    } catch (error) {
      console.error("Error calling API:", error);
      setApiResponse("Error occurred while calling the API");
    }
  };

  const resetHandler = () => {
    setApiResponse(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-2xl font-bold mb-4">Nest.js API Interaction</h1>

        <div className="flex space-x-4">
          <button
            onClick={callNestApi}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Call Nest API
          </button>

          <button
            onClick={resetHandler}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Reset
          </button>
        </div>

        {apiResponse && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="text-lg font-semibold text-black">
              API Response: {apiResponse}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
