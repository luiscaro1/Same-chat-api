import { FunctionBase } from "lodash";
import express from "express";
import path from "path";
import Router from "@/Router";
import Inject from "@/Decorators/Inject";

class RouteHandler {
  @Inject("router") public static handler: Router;

  public static handle(type: string, p: string): FunctionBase {
    const { router } = RouteHandler.handler;

    interface decorator {
      value: express.Application;
    }

    return (
      _target: FunctionConstructor,
      _key: string,
      _descriptor: decorator
    ): void => {
      const base = path.join(
        "/",
        _target.name.toLocaleLowerCase().split("controller")[0]
      );

      switch (type.toLowerCase()) {
        case "get":
          router.get(path.join(base, p), (req, res) => {
            _descriptor.value(req, res);
          });

          break;
        case "post":
          router.post(path.join(base, p), (req, res) => {
            _descriptor.value(req, res);
          });
          break;
        case "put":
          router.put(path.join(base, p), (req, res) => {
            _descriptor.value(req, res);
          });
          break;
        case "delete":
          router.delete(path.join(base, p), (req, res) => {
            _descriptor.value(req, res);
          });
          break;
        default:
          router.get(path.join(base, p), (req, res) => {
            _descriptor.value(req, res);
          });
      }
    };
  }
}

export default RouteHandler.handle;
