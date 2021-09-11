import express from "express";
import Injectable from "services/decorators/injectable";

@Injectable("router")
class Router {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
  }
}

export default Router;
