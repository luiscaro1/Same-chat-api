import express from "express";
import inboxRouter from "routes/inbox";

export default function routeHandler(app: express.Application): void {
  app.use("/inbox", inboxRouter);

  app.get("/", (req: express.Request, res: express.Response) => {
    res.send(`Welcome to Same's Chat API`);
  });
}
