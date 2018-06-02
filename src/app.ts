import { HttpServer } from "./serverModule";

class Main {
  constructor() {
    new HttpServer().init();
  }
}

const main = new Main();