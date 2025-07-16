import { PDFDownloadLink } from '@react-pdf/renderer';
import type { Patient, Diagnose } from '@/types/patient';
import PatientPDFDocument from './patient-document-pdf';

interface PatientPDFProps {
  patient: Patient;
  diagnoses: Diagnose[];
  fileName?: string;
}

const PatientPDF: React.FC<PatientPDFProps> = ({
  patient,
  diagnoses,
  fileName = `historial-${patient.name.replace(/\s+/g, '-').toLowerCase()}.pdf`,
}) => {
  return (
    <PDFDownloadLink
      document={<PatientPDFDocument patient={patient} diagnoses={diagnoses} />}
      fileName={fileName}
      className="inline-flex items-center gap-2 px-4 py-2 bg-medical-primary hover:bg-medical-primary-dark text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-medical-primary focus:ring-offset-2"
    >
      {({ loading, error }) =>
        error ? (
          <div className="text-red-500">Error al generar el PDF</div>
        ) : loading ? (
          <>
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
            Generando PDF...
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Descargar PDF
          </>
        )
      }
    </PDFDownloadLink>
  );
};

export default PatientPDF;
