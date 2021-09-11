import fs from "fs";
import path from "path";
import Injectable from "./decorators/injectable";

Injectable("controllerHandler");
class ControllerHandler {
  public static use() {
    fs.readdirSync("./src/controllers").forEach((file) => {
      import(path.join("controllers", file));
    });
  }
}

export default ControllerHandler.use();
