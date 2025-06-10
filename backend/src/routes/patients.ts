import { Router } from "express";
import patientService from "../services/patients";

const router = Router();

router.get("/", (_req, res) => {
  res.json(patientService.getAllPublicPatients());
});

export default router;
