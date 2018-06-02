import * as http from "http";

export class HttpServer {
  public init = () => {
    const listenr = (request, response) => this.requestHandler(request, response);
    const server: http.Server = http.createServer(listenr);
    const port: number = 5000;
    server.listen(port);
  }

  private requestHandler = (request: http.IncomingMessage, response: http.ServerResponse) => {
    const chunk = 'Hello Node.js with Typescript';
    response.end(chunk);
  }
}