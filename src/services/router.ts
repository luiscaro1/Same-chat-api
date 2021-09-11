import express from "express";
import Injectable from "services/decorators/injectable";
import fs from "fs";
import path from "path";

@Injectable("router")
class Router {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
  }
}

export default Router;
