
import { Server, createServer } from "http";
import { config } from "dotenv";
import app from "./app";
import db from "./config/db";
import * as socketIo from "socket.io"; // Import socket.io library
config()
const server: Server = createServer(app);


const io = new socketIo.Server(server); // Create socket.io instance

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle socket events here

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});



const port = Number(process.env.PORT || 9000);

db()
  .then(() => {
    server.listen(port, () => {
      // serverLogger.info("Express server started on port: " + port);
      console.log("Express server started on port: " + port)
    });
  })
  .catch((err) => {
    // dbLogger.error("Connection error: " + err);
    console.log("error", err)
  });