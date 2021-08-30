import { Router } from "express";
import { storeMessage, getAllRecipients } from "controllers/inbox";

const router: Router = Router();

router.post("/message", storeMessage);

router.get("/all", getAllRecipients);

export default router;
