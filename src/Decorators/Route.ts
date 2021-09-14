import Router from "Router";
import Inject from "Decorators/Inject";
import express from "express";
import { FunctionBase } from "lodash";

class RouteHandler {
  @Inject("router") public static handler: Router;

  public static handle(type: string, path: string): FunctionBase {
    const { router } = RouteHandler.handler;

    interface decorator {
      value: express.Application;
    }

    return (
      _target: FunctionConstructor,
      _key: string,
      _descriptor: decorator
    ): void => {
      switch (type.toLowerCase()) {
        case "get":
          router.get(path, (req, res) => {
            _descriptor.value(req, res);
          });

          break;
        case "post":
          router.post(path, (req, res) => {
            _descriptor.value(req, res);
          });
          break;
        case "put":
          router.put(path, (req, res) => {
            _descriptor.value(req, res);
          });
          break;
        case "delete":
          router.delete(path, (req, res) => {
            _descriptor.value(req, res);
          });
          break;
        default:
          router.get(path, (req, res) => {
            _descriptor.value(req, res);
          });
      }
    };
  }
}

export default RouteHandler.handle;
