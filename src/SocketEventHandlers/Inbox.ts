import { Socket } from "socket.io";
import { JOIN } from "@/SocketEventHandlers/Events/Inbox";

export default function HandleInboxEvents(socket: Socket): void {
  socket.on(JOIN, async (lid: string) => {
    socket.join(lid);
  });
}
