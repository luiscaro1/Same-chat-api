import Container from "services/container";
import { FunctionBase } from "lodash";

export default function Injectable(token: string): FunctionBase {
  return function (Target: FunctionConstructor): void {
    Container.providers[token] = new Target();
  };
}
