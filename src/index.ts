import express from "express";
import cors from "cors";

const PORT: string | number = process.env.PORT || 5000;

let app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Welcome!");
});

app.listen(PORT);
