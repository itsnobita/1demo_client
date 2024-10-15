import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import PageNotFound from "../PageNotFound";
import TestComp from "../TestComp";
import Nobi from "../Nobi/Nobi";
import Login from "../Login/Login";
import Chat from "../Chat";
import SecretMessageSender from "../Message/SecretMessageSender";
import Screenshot from "../Screenshot/Screenshot";
import MessageForm from "../AddMessgae/MessageForm";
import GetMessage from "../GetMessage/GetMessage";


function RouterHandler() {
  return (
      <Routes>
          
          <Route path="/nobi" element={<SecretMessageSender/>}/>
          <Route path="/ss" element={<Screenshot/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/test" element={<TestComp />} />
          {/* <Route path="/nobi" element={<Nobi />} /> */}
      <Route path="/chat" element={<Chat />} />
      <Route path="/addmsg" element={<MessageForm/>}/>
      <Route path="/showmsg" element={<GetMessage/>}/>

   </Routes>
  );
}

export default RouterHandler;
