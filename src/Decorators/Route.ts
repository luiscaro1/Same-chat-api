import { FunctionBase } from "lodash";
import express from "express";
import path from "path";
import Router from "@/Router";
import Inject from "@/Decorators/Inject";

const types: Array<string> = [
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "copy",
  "head",
  "options",
  "link",
  "unlink",
  "pruge",
  "lock",
  "unlock",
  "propfind",
  "view",
];

interface StringRouter extends express.Router {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any;
}
interface decorator {
  value: express.Application;
}

class RouteHandler {
  @Inject("router") public static handler: Router;

  public static handle(type: string, p: string): FunctionBase {
    const { router }: { router: StringRouter } = RouteHandler.handler;

    return (
      _target: FunctionConstructor,
      _key: string,
      _descriptor: decorator
    ): void => {
      const base = path.join(
        "/",
        _target.name.toLocaleLowerCase().split("controller")[0]
      );

      // eslint-disable-next-line no-underscore-dangle
      const _type = type.toLowerCase();

      if (!types.includes(_type)) return;

      // eslint-disable-next-line no-underscore-dangle
      router[_type](
        path.join(base, p),
        (req: express.Request, res: express.Response) => {
          _descriptor.value(req, res);
        }
      );
    };
  }
}

export default RouteHandler.handle;
