import express from "express";
import Injectable from "@/Decorators/Injectable";
import Inject from "@/Decorators/Inject";
import route from "@/Decorators/Route";
import InboxDAO from "@/Daos/Inbox";
import Message from "@/Types/Inbox";

@Injectable("inboxController")
class InboxController {
  @Inject("inboxDAO") public static inboxDAO: InboxDAO;

  // TODO: Handle media messages with media server
  @route("POST", "message")
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

  @route("POST", "rooms")
  public static async getAllRecipients(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const messages = await InboxController.inboxDAO.getMessages(req.body);
      res.json(messages);
    } catch (err) {
      res.status(400).send(err);
    }
  }
}

export default InboxController;
