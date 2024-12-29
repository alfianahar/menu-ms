"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { increment, decrement } from "../../store/features/exampleSlice";

export default function Home() {
  const count = useAppSelector((state) => state.example.value);
  const dispatch = useAppDispatch();

  const [apiResponse, setApiResponse] = useState<string | null>(null);

  const callHelloApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL + "/api" : "/api"}/hello`,
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
          <Button onClick={callHelloApi}>Call Hello API</Button>
          {/* <Button onClick={callNestApi}>Call Nest API</Button> */}

          <Button onClick={resetHandler}>Reset</Button>
        </div>

        {apiResponse && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="text-lg font-semibold text-black">
              API Response: {apiResponse}
            </p>
          </div>
        )}
      </div>

      <h1 className="text-2xl font-bold mt-4">Count Redux: {count}</h1>
      <div className="flex space-x-4">
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      </div>
    </main>
  );
}
