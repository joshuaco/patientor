import { Router, Request, Response } from 'express';
import {
  patientExists,
  patientValidate,
} from '../middlewares/validate-patient';
import { entryExists, validateEntry } from '../middlewares/validate-entry';
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
  patientExists,
  (req: Request<unknown, unknown, NewEntry>, res: Response<Entry>) => {
    const newEntry = entryService.addNewEntry(req.body, req.patient);
    res.status(201).json(newEntry);
  }
);

router.delete(
  '/:id/entries/:entryId',
  patientExists,
  entryExists,
  (req: Request, res: Response) => {
    entryService.deleteEntry(req.patient, req.params.entryId);
    res.status(200).json({ message: 'Entry deleted successfully' });
  }
);

router.use(errorHandler);

export default router;
