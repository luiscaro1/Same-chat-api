import express from "express";
import cors from "cors";
import http from "http";
import { Server, Socket } from "socket.io";
import "lib/env";
import Router from "services/router";
import ControllerHandler from "services/ControllerHandler";
import Inject from "./services/decorators/inject";

class Application {
  @Inject("router") public static r: Router;

  static init() {
    const PORT: string | number = process.env.PORT || 5001;

    const app = express();

    ControllerHandler.use();

    app.use(Application.r.router);

    app.use(cors());
    app.use(express.json());

    // routeHandler(app);

    const httpServer: http.Server = http.createServer(app);

    const io = new Server(httpServer);

    io.on("connection", (socket: Socket) => {
      // socket.onAny((event, ...args) => {
      // console.log(event, args);
      // });
    });

    httpServer.listen(PORT);
  }
}

Application.init();

export default Application;
