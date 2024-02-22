import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import PageNotFound from "../PageNotFound";
import TestComp from "../TestComp";
import Nobi from "../Nobi/Nobi";
import Login from "../Login/Login";
import Chat from "../Chat";


function RouterHandler() {
  return (
      <Routes>
          
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/test" element={<TestComp />} />
          <Route path="/nobi" element={<Nobi />} />
          <Route path="/chat" element={<Chat />} />

   </Routes>
  );
}

export default RouterHandler;
