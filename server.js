const app = require("express")();
const server = require("http").Server(app);
const WebSocket = require("ws");
const shortid = require("shortid");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
let port = 3000;

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

const wss = new WebSocket.Server({ port: 8080, clientTracking: true });
const rooms = [];

// room = {
//   name: "Document",
//   editor: [],
//   viewers: [],
//   file: "love-editor.org"
// }

wss.on("connection", function open(ws) {
  ws.on("message", function incoming(message) {
    console.log("message", message);
    // console.log("received: %s", JSON.parse(message).text);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send("Olá");
      }
    });
  });

  ws.send("something", ws.clients);
});
