import * as http from "http";
import * as path from "path";
import { isNullOrUndefined } from "util";
import * as fs from "fs";

export class HttpServer {
  private port = 5000;
  private rootDir = "/";

  public init = () => {
    const requestListenr = (request, response) => this.requestHandler(request, response);
    const server: http.Server = http.createServer(requestListenr);
    const listeningListener = () => this.listeningHandler();
    server.listen(this.port, this.listeningHandler);
  }

  private listeningHandler = () => {
    console.log(`${this.port} で http サーバーが待ち受け状態です`);
  }

  private requestHandler = (request: http.IncomingMessage, response: http.ServerResponse) => {
    let requestUrl = request.url;
    const filePath = `${__dirname}${this.rootDir}${requestUrl}`;
    // console.log(`filePath: ${filePath}`);
    const extension = path.extname(requestUrl);
    // console.log(`extension: ${extension}`);
    let contentType = "";
    let isBinary: boolean = false;

    if (isNullOrUndefined(extension)) {
      requestUrl = "index.html";
      contentType = "text/html";
      isBinary = false;
      this.responseHandler(filePath, contentType, isBinary, response);
      return;
    }

    switch (extension) {
      case '.html':
        contentType = "text/html";
        isBinary = false;
        break;
      case ".css":
        contentType = "text/css";
        isBinary = false;
        break;
      case ".js":
      case ".ts":
        contentType = "text/javascript";
        isBinary = false
        break;
      // 以下、jpg, swf なども同様
      default:
        requestUrl = "index.html";
        contentType = "text/html";
        isBinary = false;
        break;
    }

    this.responseHandler(filePath, contentType, isBinary, response);
  }

  private responseHandler = (filePath: string, contentType: string, isBinary: boolean, response: http.ServerResponse) => {

    const encoding = isBinary ? "binary" : "utf8";
    const options =  { encoding: encoding };
    fs.readFile(filePath, options, (error: NodeJS.ErrnoException, data: string) => {
      if (error) {
        console.log(`filePath: ${filePath}, error: ${JSON.stringify(error, null, 2)}`);
        const internalServerError = 500;
        response.statusCode = internalServerError;
        response.end("Internal Server Error");
        return;
      }

      const ok = 200;
      response.statusCode = ok;
      response.setHeader("Content-Type", contentType);
      response.end(data, isBinary ? "binary" : undefined);
    });
  }
}
