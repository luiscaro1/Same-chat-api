import express from "express";
import Injectable from "services/decorators/injectable";
import Inject from "services/decorators/inject";
import DbContext from "services/db";
import route from "services/decorators/route";

@Injectable("inboxController")
class InboxController {
  @Inject("dbContext") public static dbContext: DbContext;

  // TODO: Handle media messages with media server
  @route("POST", "/inbox/message")
  public static async storeMessage(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { content, type, uid, mid, rid } = req.body;
    await InboxController.dbContext.db
      .insert({
        content,
        type,
        uid,
        mid,
        rid,
      })
      .into("Message")
      .then(() => {
        res.status(201).end();
      })

      .catch((err) => {
        res.status(400).send(err);
      });
  }

  // TODO

  @route("POST", "/inbox/all")
  public static async getAllRecipients(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    // TODO

    res.json("Get messages");
  }
}

export default InboxController;
