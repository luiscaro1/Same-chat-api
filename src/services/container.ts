import { find } from "lodash";

export class Container {
  public providers: { [key: string]: any } = {};

  public resolve(token: string) {
    const matchedProvider = find(
      this.providers,
      (_provider: any, key: any) => key === token
    );

    if (matchedProvider) return matchedProvider;
    throw new Error(`No provider found for ${token}`);
  }
}

export default new Container();
