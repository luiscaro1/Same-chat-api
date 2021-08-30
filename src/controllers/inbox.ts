import express from "express";

export async function storeMessage(
  req: express.Request,
  res: express.Response
) {
  res.send("Store message");
}

export async function getAllRecipients(
  req: express.Request,
  res: express.Response
) {
  // TODO: Implement get messages
  res.send("Get messages");
}
