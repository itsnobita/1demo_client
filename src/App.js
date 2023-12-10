import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouterHandler from "./components/Routes/RouteHandler";

const App = () => {
  return (
    <BrowserRouter>
      <>
        <RouterHandler />
        </>
    </BrowserRouter>
  );
};

export default App;
