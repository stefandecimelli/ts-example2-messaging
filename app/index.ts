import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/html")
  res.send("<h1>Hello, world!</h1>",);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});