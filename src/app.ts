import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/api/health", (request: Request, response: Response) => {
  response
    .status(200)
    .json({
      message: "API is running",
      uptime: `${process.uptime().toFixed(2)} seconds`,
    });
});

const PORT: string = process.env.PORT || "8000";
app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));
