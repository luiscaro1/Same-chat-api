import express from "express";
import Injectable from "services/decorators/injectable";
import Inject from "services/decorators/inject";
import DbContext from "services/db";

@Injectable("inboxController")
class InboxController {
  @Inject("dbContext") public dbContext!: DbContext;

  storeMessage = async (req: express.Request, res: express.Response) => {
    // TODO
    res.json("Store message");
  };

  getAllRecipients = async (_req: express.Request, res: express.Response) => {
    // TODO
    res.send("Get messages");
  };
}

export default new InboxController();
