/* eslint-disable camelcase */
// TODO: Create a class  that contains all the database access and moditication methods.

import Inject from "services/decorators/inject";

import DbContext from "services/db";
import Message from "types/inbox";
import { v4 as uuid } from "uuid";
import Injectable from "services/decorators/injectable";

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
