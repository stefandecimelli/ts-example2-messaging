import express, { Express, Request, Response } from "express";
import pino from "pino";

const logger = pino({ level: 'info' });
const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json")
  res.send({
    message: "Hello, world!"
  });
});

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});