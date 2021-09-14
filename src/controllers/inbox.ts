import express from "express";
import Injectable from "services/decorators/injectable";
import Inject from "services/decorators/inject";
import route from "services/decorators/route";
import InboxDAO from "daos/inbox";
import Message from "types/inbox";

@Injectable("inboxController")
class InboxController {
  @Inject("inboxDAO") public static inboxDAO: InboxDAO;

  // TODO: Handle media messages with media server
  @route("POST", "/inbox/message")
  public static async storeMessage(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      await InboxController.inboxDAO.storeMessage(req.body as Message);
      res.status(201).end();
    } catch (err) {
      res.status(400).send(err);
    }
  }

  // TODO

  @route("POST", "/inbox/all")
  public static async getAllRecipients(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    res.json("Get messages");
  }
}

export default InboxController;
