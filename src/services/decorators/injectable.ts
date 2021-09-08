import container from "services/container";

export default function Injectable(token: string): any {
  return function (Target: { new (): any }): void {
    container.providers[token] = new Target();
  };
}
