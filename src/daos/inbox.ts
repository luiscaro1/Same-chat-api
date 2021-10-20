/* eslint-disable camelcase */
import Inject from "@/Decorators/Inject";
import DbContext from "@/Db/Index";
import SocketServer from "@/SocketServer";
import Message from "@/Types/Inbox";
import Injectable from "@/Decorators/Injectable";
import { MESSAGE } from "@/SocketEventHandlers/Events/Inbox";

interface MessageBody {
  lid: string;
  uid: string;
  type: string;
  content: string;
}

interface MulterFile extends Express.Multer.File {
  filename: string;
}

@Injectable("inboxDAO")
class InboxDAO {
  @Inject("dbContext") public dbContext!: DbContext;

  @Inject("socketServer") public socketServer!: SocketServer;

  public async store(mb: MessageBody) {
    const mid = await this.dbContext.db
      .insert(mb)
      .into("Message")
      .returning("mid");

    const message = (
      await this.dbContext.db
        .raw(`select * from "Message" as M natural inner join (select uid,user_name,avatar_url from "User")as U
      where M.uid = U.uid and M.mid='${mid}'`)
    ).rows[0];

    this.socketServer.socket
      .to((message as Message).lid)
      .emit(MESSAGE, message);
  }

  public async storeMessage(
    files: { [name: string]: MulterFile },
    body: MessageBody
  ): Promise<void> {
    const { lid, uid, type, content } = body;

    if (type === "FILE") {
      (files as any).forEach((file: MulterFile) => {
        this.store({
          lid,
          uid,
          type,
          content: file.filename,
        });
      });
    } else {
      this.store({
        lid,
        uid,
        type,
        content,
      });
    }
  }

  public async getMessages({
    pageNumber,
    limit,
    lid,
  }: {
    pageNumber: number;
    limit: number;
    lid: string;
  }): Promise<Array<Message>> {
    const messages: Array<Message> = (
      await this.dbContext.db
        .raw(`select * from "Message" as M natural inner join (select uid,user_name,avatar_url from "User")as U
      where M.uid = U.uid and M.lid='${lid}' order by created_at asc limit ${limit} offset ${
        (pageNumber - 1) * limit
      } `)
    ).rows;

    return messages;
  }
}

export default InboxDAO;
