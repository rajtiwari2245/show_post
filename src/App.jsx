import { useState } from "react";
import {PostProvider} from './context/postContext'

import "./App.css";
import ShowCard from "./pages/showcard/ShowCard";

function App() {
  return (
    <>
      <PostProvider>
        <div className="bg-gray-100 min-h-screen p-4 " >
          <div className="max-w-3xl mx-auto">
            <h1 className=" text-2xl font-bold text-center mb-6">Posts</h1>
            <ShowCard />
          </div>
        </div>
      </PostProvider>
    </>
  );
}

export default App;
