import express from "express";
import Injectable from "@/Decorators/Injectable";
import Inject from "@/Decorators/Inject";
import route from "@/Decorators/Route";
import InboxDAO from "@/Daos/Inbox";
import Upload from "@/Storage/Upload";

@Injectable("inboxController")
class InboxController {
  @Inject("inboxDAO") public static inboxDAO: InboxDAO;

  @Inject("upload") public static multer: Upload;

  // TODO: Handle media messages with media server
  @route("POST", InboxController.multer.upload.array("files"), "message")
  public static async storeMessage(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { files, body } = req;

    try {
      await InboxController.inboxDAO.storeMessage(files as any, body);
      res.status(201).end();
    } catch (err) {
      res.status(400).send(err);
    }
  }

  @route("POST", "messages")
  public static async getAllMessages(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const lobbies = await InboxController.inboxDAO.getMessages(req.body);
      res.json(lobbies);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  @route("GET", "env")
  public static async getEnv(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    res.send(process.env.NODE_ENV);
  }
}

export default InboxController;
