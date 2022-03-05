import React from "react";

const messagingSocket = new WebSocket("ws://localhost:8000/message");
(function setUpSocket() {
  console.log("inside setup");
  messagingSocket.onmessage = function (event) {
    console.log("data", event.data);
  };
})();
// curl --header 'content-type: application/json' http://localhost:8000/post-message
// --data '{"msg": "iam fine"}'

const Demo = () => {
  const sendMessage = async () => {
    fetch("http://localhost:8000/post-message", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ msg: "kya haal hai bhai" }),
    });
  };
  const handleSendMessageClick = () => {
    sendMessage();
  };

  return (
    <div>
      <button onClick={() => handleSendMessageClick()}>Post Message</button>
    </div>
  );
};

export default Demo;
