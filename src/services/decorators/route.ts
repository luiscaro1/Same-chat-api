import Router from "services/router";
import Inject from "./inject";

class RouteHandler {
  @Inject("router") public handler!: Router;

  handle = (type: string, path: string): any => {
    const { router } = this.handler;

    return (_target: any, _key: any, _descriptor: any): void => {
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
  };
}

export default new RouteHandler().handle;
