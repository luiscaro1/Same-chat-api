import express from "express";
import cors from "cors";
import http from "http";
import { Server, Socket } from "socket.io";
import routeHandler from "routes/routeHandler";
import "lib/env";

const PORT: string | number = process.env.PORT || 5001;

const app: express.Application = express();

app.use(cors());
app.use(express.json());

routeHandler(app);

const httpServer: http.Server = http.createServer(app);

const io = new Server(httpServer);

io.on("connection", (socket: Socket) => {
  // socket.onAny((event, ...args) => {
  // console.log(event, args);
  // });
});

httpServer.listen(PORT);
