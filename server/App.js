const express = require("express");
const cors = require("cors");
const expressWs = require("express-ws");
const app = express();
expressWs(app);
app.use(express.json());
app.use(cors());

const users = [];
const messages = ["hi .... all"];

const port = 8000;
app.listen(port, () => {
  console.log("listinng to port: " + port);
});

app.get("/load-data", (req, res) => {
  res.send("LOAD DATA COMPLETE");
});

app.post("/post-message", (req, res) => {
  const { msg } = req.body;
  console.log("messga", msg);

  for (const user of users) {
    user.send(JSON.stringify(msg));
  }
  res.send("DONE");
});

app.ws("/message", (socket) => {
  users.push(socket);

  socket.on("close", () => {
    users.splice(users.indexOf(socket), 1);
  });
});
