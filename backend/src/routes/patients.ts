import { Router, Request, Response } from 'express';
import { errorHandler, patientValidate } from '../middlewares/patient-validate';
import { NewPatient, Patient } from '../types/patients';
import patientService from '../services/patients';

const router = Router();

router.get('/', (_req, res) => {
  res.json(patientService.getAllPublicPatients());
});

router.post(
  '/',
  patientValidate,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const newPatient = patientService.addNewPatient(req.body);
    res.status(201).json(newPatient);
  }
);

router.use(errorHandler);

export default router;
