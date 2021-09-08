import container from "services/container";

export default function Inject(token: string) {
  return function (target: any, key: string): void {
    Object.defineProperty(target, key, {
      get: () => container.resolve(token),
      enumerable: true,
      configurable: true,
    });
  };
}
