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
}

export default InboxDAO;
