import Container from "services/container";

export default function Injectable(token: string): any {
  return function (Target: { new (): any }): void {
    console.log(token);
    Container.providers[token] = new Target();
  };
}
