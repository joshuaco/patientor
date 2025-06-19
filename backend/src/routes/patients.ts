import { Router, Request, Response } from 'express';
import { patientValidate } from '../middlewares/validate-patient';
import { validateEntry } from '../middlewares/validate-entry';
import { errorHandler } from '../middlewares/error-handler';
import patientService from '../services/patients';
import entryService from '../services/entries';

import type { Entry, NewEntry, NewPatient, Patient } from '../types/patients';

const router = Router();

router.get('/', (_req, res) => {
  res.json(patientService.getAllPublicPatients());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json(patientService.getPatientById(id));
});

router.post(
  '/',
  patientValidate,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const newPatient = patientService.addNewPatient(req.body);
    res.status(201).json(newPatient);
  }
);

router.post(
  '/:id/entries',
  validateEntry,
  (req: Request<unknown, unknown, NewEntry>, res: Response<Entry>) => {
    const newEntry = entryService.addNewEntry(req.body);
    res.status(201).json(newEntry);
  }
);

router.use(errorHandler);

export default router;
