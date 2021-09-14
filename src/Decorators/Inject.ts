import ServiceContainer from "ServiceContainer";
import { FunctionBase } from "lodash";

export default function Inject(token: string): FunctionBase {
  return function (target: FunctionConstructor, key: string) {
    Object.defineProperty(target, key, {
      get: () => ServiceContainer.resolve(token),
      enumerable: true,
      configurable: true,
    });
  };
}
