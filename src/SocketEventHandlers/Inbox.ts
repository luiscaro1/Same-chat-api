import { Socket } from "socket.io";

export default function HandleInboxEvents(socket: Socket): void {
  socket.on("MESSAGE", (msg) => {
    console.log("Here is the message");
  });
}
