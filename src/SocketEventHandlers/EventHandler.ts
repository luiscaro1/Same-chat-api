import { Socket } from "socket.io";
import HandleInboxEvents from "@/SocketEventHandlers/Inbox";

export default class EventHandler {
  public static handle(socket: Socket): void {
    HandleInboxEvents(socket);
  }
}
