import express from "express";
import Injectable from "services/decorators/injectable";
import { find } from "lodash";

@Injectable("router")
class Router {
  public router: express.Router;

  public providers: { [key: string]: any } = {};

  constructor() {
    this.router = express.Router();
  }

  public resolve(token: string): any {
    const matchedProvider = find(
      this.providers,
      (_provider: any, key: any) => key === token
    );

    if (matchedProvider) return matchedProvider;
    throw new Error(`No provider found for ${token}`);
  }
}

export default Router;
