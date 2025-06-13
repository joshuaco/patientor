import { Router } from "express";
import patientService from "../services/patients";

const router = Router();

router.get("/", (_req, res) => {
  res.json(patientService.getAllPublicPatients());
});

router.post("/", (req, res) => {
  const patientData = req.body;
  const newPatient = patientService.addNewPatient(patientData);

  res.json(newPatient);
});

export default router;
