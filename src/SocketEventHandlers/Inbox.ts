import { Socket } from "socket.io";
import { MESSAGE, JOIN, CREATE } from "@/SocketEventHandlers/Events/Inbox";
import InboxDAO from "@/Daos/Inbox";
import Message from "@/Types/Inbox";

export default function HandleInboxEvents(
  socket: Socket,
  inboxDAO: InboxDAO
): void {
  socket.on(JOIN, async (rid: string) => {
    socket.join(rid);
  });
  socket.on(CREATE, async ({ name, uid }: { name: string; uid: string }) => {
    const rid = await inboxDAO.createRoom({ name, uid });
    socket.join(rid);
  });
  socket.on(MESSAGE, async (msg: Message) => {
    try {
      await inboxDAO.storeMessage(msg);
      socket.to(msg.rid).emit(MESSAGE, msg);
    } catch (err) {
      // silent fail
    }
  });
}
