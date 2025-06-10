import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnose";
import patientsRouter from "./routes/patients";

import { corsConfig } from "./config/cors";

const app = express();

app.use(cors(corsConfig));
app.use(express.json());

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

export default app;
