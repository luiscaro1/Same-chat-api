import { Socket } from "socket.io";
import HandleInboxEvents from "@/SocketEventHandlers/Inbox";

export default function EventHandler(socket: Socket): void {
  HandleInboxEvents(socket);
}
