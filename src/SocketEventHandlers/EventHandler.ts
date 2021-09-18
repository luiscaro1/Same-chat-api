import { Socket } from "socket.io";
import HandleInboxEvents from "@/SocketEventHandlers/Inbox";
import Inject from "@/Decorators/Inject";
import InboxDAO from "@/Daos/Inbox";

export default class EventHandler {
  @Inject("inboxDAO") public static inboxDAO: InboxDAO;

  public static handle(socket: Socket): void {
    HandleInboxEvents(socket, this.inboxDAO);
  }
}
