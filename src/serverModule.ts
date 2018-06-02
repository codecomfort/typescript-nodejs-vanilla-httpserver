import * as http from "http";

export class HttpServer {
  private port: number = 5000;
  public init = () => {
    const listenr = (request, response) => this.requestHandler(request, response);
    const server: http.Server = http.createServer(listenr);
    const listeningListener = () => this.listeningHandler();
    server.listen(this.port, this.listeningHandler);
  }

  private listeningHandler = () => {
    console.log(`${this.port} で http サーバーが待ち受け状態です`);
  }

  private requestHandler = (request: http.IncomingMessage, response: http.ServerResponse) => {
    const chunk = 'Hello Node.js with Typescript';
    response.end(chunk);
  }
}