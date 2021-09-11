import fs from "fs";
import path from "path";

class ControllerHandler {
  public static use() {
    fs.readdirSync("./src/controllers").forEach((file) => {
      import(path.join("controllers", file));
    });
  }
}

export default ControllerHandler;
