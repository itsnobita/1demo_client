import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouterHandler from "./components/Routes/RouteHandler";
import HeartBeat from "./components/HeartBeat";

const App = () => {
  return (
    <BrowserRouter>
    <HeartBeat/>
        <RouterHandler />
        
    </BrowserRouter>
  );
};

export default App;
