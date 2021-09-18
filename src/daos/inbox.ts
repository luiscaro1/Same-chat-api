/* eslint-disable camelcase */
// TODO: Create a class  that contains all the database access and moditication methods.

import { v4 as uuid } from "uuid";
import Inject from "@/Decorators/Inject";

import DbContext from "@/Db/Index";
import Message from "@/Types/Inbox";
import Injectable from "@/Decorators/Injectable";

@Injectable("inboxDAO")
class InboxDAO {
  @Inject("dbContext") public dbContext!: DbContext;

  public async storeMessage({
    rid,
    uid,
    content,
    type,
  }: Message): Promise<void> {
    await this.dbContext.db
      .insert({
        mid: uuid(),
        rid,
        uid,
        type,
        content,
      })
      .into("Message");
  }

  public async createRoom({
    name,
    uid,
  }: {
    name: string;
    uid: string;
  }): Promise<string> {
    const rid = uuid();

    // TODO: Verify if user exists

    await this.dbContext.db.insert({ rid, name, members: [uid] }).into("Room");

    return rid;
  }

  public async getMessages({
    pageNumber,
    limit,
    uid,
  }: {
    pageNumber: number;
    limit: number;
    uid: string;
  }): Promise<{ [id: string]: Array<Message> }> {
    const rooms = await this.dbContext.db
      .select("rid")
      .from("Room")
      .where("members", "@>", [uid]);

    const mapped: { [id: string]: Array<Message> } = {};

    const promises = await rooms.map(async ({ rid }) => {
      const messages: Array<Message> = await this.dbContext.db
        .select()
        .from("Message")
        .where("rid", rid)
        .limit(limit)
        .offset((pageNumber - 1) * limit);

      mapped[rid] = messages;
    });

    await Promise.all(promises);

    return mapped;
  }
}

export default InboxDAO;
