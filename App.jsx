import React from "react";
import { BrowserRouter} from "react-router-dom";
import "./App.css";
import RouterHome from "./src/Router/RouterHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <RouterHome />
      </BrowserRouter>
    </>
  );
}

export default App;
