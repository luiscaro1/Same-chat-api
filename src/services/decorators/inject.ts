import container from "services/container";

export default function Inject(token: string): any {
  return function (target: FunctionConstructor, key: string) {
    Object.defineProperty(target, key, {
      get: () => container.resolve(token),
      enumerable: true,
      configurable: true,
    });
  };
}
