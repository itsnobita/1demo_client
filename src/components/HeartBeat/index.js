import React, { useEffect } from "react";
import { domainName } from "../../config/urls";
import Axios from "axios";

export default function HeartBeat() {
  const heartBeatApiCall = () => {
    let HierarchyURL = `${domainName}/shared/refresh-session`;
    try {
      Axios.get(`${HierarchyURL}`)
        .then((response) => console.log("success"))
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (true) {
      //condition on props
      let timeInterval = setInterval(() => {
        heartBeatApiCall();
      }, 1 * 60 * 1000);
      return () => {
        clearInterval(timeInterval);
      };
    }
  }, []); //condition on props
  return <div style={{ display: "none" }}></div>;
}
