import express from "express";
import inboxRouter from "routes/inbox";

export default function routeHandler(app: express.Application): void {
  app.use("/inbox", inboxRouter);
}
