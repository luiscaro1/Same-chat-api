import express from "express";
import Injectable from "services/decorators/injectable";
import Inject from "services/decorators/inject";
import DbContext from "services/db";
import route from "services/decorators/route";

@Injectable("inboxController")
class InboxController {
  @Inject("dbContext") public dbContext!: DbContext;

  @route("POST", "/inbox/message")
  public async storeMessage(req: express.Request, res: express.Response) {
    // TODO
    try {
      const rooms = await this.dbContext.db.select().from("Room");
      res.json(rooms);
    } catch (err) {
      res.json(err);
    }
  }

  getAllRecipients = async (_req: express.Request, res: express.Response) => {
    // TODO
    res.json("Get messages");
  };
}

export default new InboxController();
