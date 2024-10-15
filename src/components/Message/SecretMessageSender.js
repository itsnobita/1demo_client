import React, { useState } from "react";
import "./index.css";
import { domainName } from "../../config/urls";

const SecretMessageSender = () => {
  const [message, setMessage] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const getIP = async () => {
    let deviceDetails = {
      userAgent: navigator.userAgent,
      appCodeName: navigator.appCodeName,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      language: navigator.language,
      platform: navigator.platform,
    };

    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      deviceDetails.publicIp = data.ip;
    } catch (error) {
      console.error("Error fetching IP:", error);
    }

    return deviceDetails;
  };

  const sendM = async (deviceDetails) => {
    try {
      const response = await fetch(`${domainName}/sendmemsg/nobi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, deviceDetails }),
        credentials: "include",
      });
      const data = await response.json();
      setMessage("");
      setConfirm(
        <div className="alert alert-success" role="alert">
          Message sent successfully
        </div>
      );
      setTimeout(() => {
        setConfirm("");
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendMessage = async () => {
    if (message.trim() === "") {
      setMessage("");
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 500);
      return;
    }

    setLoading(true);
    const deviceDetails = await getIP();
    await sendM(deviceDetails);
    setLoading(false);
  };

  return (
    <div className="top-container">
      <div className="container">
        <span id="confirm">{confirm}</span>
        <h2>Send Nobi a secret message</h2>
        <label htmlFor="message" className="sendMSGlabel">
          Secret Message:
        </label>
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            shake ? "Can't be empty.." : "Enter your secret message..."
          }
          className={shake ? "shake sendMSGinput" : "sendMSGinput"}
        />
        <button onClick={sendMessage} id="send" className="sendMSGButton">
          {loading ? <div className="loader" id="loader"></div> : "Send"}
        </button>
        <label
          htmlFor="message"
          className="sendMSGlabel"
          style={{ marginTop: "15px", marginBottom: "5px" }}
        >
          Send an image with a secret message?
          <a href="/ss" style={{ textDecoration: "none" }}>
            {" "}
            Click here
          </a>
        </label>
        <label
          htmlFor="message"
          className="sendMSGlabel"
          style={{ marginTop: "15px", marginBottom: "5px" }}
        >
          Wanna check messages for you?
          <a href="/showmsg" style={{ textDecoration: "none" }}>
            {" "}
            Click here
          </a>
        </label>
      </div>
    </div>
  );
};

export default SecretMessageSender;
