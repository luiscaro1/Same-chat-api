import express from "express";
import cors from "cors";
import "lib/env";
import routeHandler from "routes/routeHandler";

const PORT: string | number = process.env.PORT || 5000;

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routeHandler(app);

app.listen(PORT);
