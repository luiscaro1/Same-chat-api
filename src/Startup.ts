import express from "express";
import cors from "cors";
import http from "http";

import { Server, Socket } from "socket.io";
import "@/Lib/Env";
import Router from "@/Router";
import "@/Controllers/InstantiateControllers";
import Inject from "@/Decorators/Inject";
import EventHandler from "@/SocketEventHandlers/EventHandler";

class Application {
  @Inject("router") private static routehandler: Router;

  public static init(): void {
    const PORT: string | number = process.env.PORT || 5001;

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(this.routehandler.router);

    const httpServer: http.Server = http.createServer(app);

    const io = new Server(httpServer);

    io.on("connection", (socket: Socket) => {
      EventHandler.handle(socket);
    });

    httpServer.listen(PORT);
  }
}

Application.init();

export default Application;
