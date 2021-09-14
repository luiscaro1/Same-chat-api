import ServiceContainer from "ServiceContainer";
import { FunctionBase } from "lodash";

export default function Injectable(token: string): FunctionBase {
  return function (Target: FunctionConstructor): void {
    ServiceContainer.providers[token] = new Target();
  };
}
