import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import { calculateAge } from '@/utils/calculate-age';
import { getEntryTypeLabel, getHealthRatingLabel } from '@/utils/entry-labels';
import type { Patient, Diagnose, Entry } from '@/types/patient';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 25,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: '2 solid #2563eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e40af',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 5,
  },
  patientInfo: {
    backgroundColor: '#f8fafc',
    padding: 20,
    marginBottom: 15,
    borderRadius: 8,
    border: '1 solid #e2e8f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 15,
    borderBottom: '1 solid #94a3b8',
    paddingBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#374151',
    width: 120,
  },
  infoValue: {
    fontSize: 11,
    color: '#1f2937',
    flex: 1,
  },
  entriesSection: {
    marginTop: 10,
  },
  entryContainer: {
    backgroundColor: '#ffffff',
    border: '1 solid #d1d5db',
    borderRadius: 6,
    padding: 15,
    marginBottom: 15,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottom: '1 solid #e5e7eb',
  },
  entryType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  entryDate: {
    fontSize: 11,
    color: '#6b7280',
  },
  entryContent: {
    marginBottom: 10,
  },
  entryField: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4b5563',
    width: 100,
  },
  fieldValue: {
    fontSize: 10,
    color: '#1f2937',
    flex: 1,
  },
  diagnosisContainer: {
    backgroundColor: '#eff6ff',
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
    border: '1 solid #dbeafe',
  },
  diagnosisTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 5,
  },
  diagnosisItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  diagnosisCode: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#dc2626',
    width: 60,
  },
  diagnosisName: {
    fontSize: 9,
    color: '#374151',
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#9ca3af',
    borderTop: '1 solid #e5e7eb',
    paddingTop: 10,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 55,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#6b7280',
  },
});

interface PatientPDFProps {
  patient: Patient;
  diagnoses: Diagnose[];
}

const PatientPDFDocument: React.FC<PatientPDFProps> = ({
  patient,
  diagnoses,
}) => {
  const age = calculateAge(patient.dateOfBirth);

  const getGenderLabel = (gender: string): string => {
    switch (gender) {
      case 'male':
        return 'Masculino';
      case 'female':
        return 'Femenino';
      default:
        return 'Otro';
    }
  };

  const getDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis?.name || 'Diagnóstico no encontrado';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderEntryDetails = (entry: Entry) => {
    switch (entry.type) {
      case 'HealthCheck':
        return (
          <View style={styles.entryField}>
            <Text style={styles.fieldLabel}>Estado de salud:</Text>
            <Text style={styles.fieldValue}>
              {getHealthRatingLabel(entry.healthCheckRating)}
            </Text>
          </View>
        );

      case 'Hospital':
        return (
          <View>
            <View style={styles.entryField}>
              <Text style={styles.fieldLabel}>Fecha de alta:</Text>
              <Text style={styles.fieldValue}>
                {formatDate(entry.discharge.date)}
              </Text>
            </View>
            <View style={styles.entryField}>
              <Text style={styles.fieldLabel}>Criterios alta:</Text>
              <Text style={styles.fieldValue}>{entry.discharge.criteria}</Text>
            </View>
          </View>
        );

      case 'OccupationalHealthcare':
        return (
          <View>
            <View style={styles.entryField}>
              <Text style={styles.fieldLabel}>Empleador:</Text>
              <Text style={styles.fieldValue}>{entry.employerName}</Text>
            </View>
            {entry.sickLeave && (
              <View>
                <View style={styles.entryField}>
                  <Text style={styles.fieldLabel}>Baja médica:</Text>
                  <Text style={styles.fieldValue}>
                    Desde {formatDate(entry.sickLeave.startDate)} hasta{' '}
                    {formatDate(entry.sickLeave.endDate)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Historial Médico del Paciente</Text>
          <Text style={styles.subtitle}>
            Generado el {new Date().toLocaleDateString('es-ES')}
          </Text>
        </View>

        {/* Información del Paciente */}
        <View style={styles.patientInfo}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nombre completo:</Text>
            <Text style={styles.infoValue}>{patient.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ID del paciente:</Text>
            <Text style={styles.infoValue}>{patient.id}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Fecha de nacimiento:</Text>
            <Text style={styles.infoValue}>
              {formatDate(patient.dateOfBirth)} ({age} años)
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Género:</Text>
            <Text style={styles.infoValue}>
              {getGenderLabel(patient.gender)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ocupación:</Text>
            <Text style={styles.infoValue}>{patient.occupation}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>SSN:</Text>
            <Text style={styles.infoValue}>{patient.ssn}</Text>
          </View>
        </View>

        {/* Entradas Médicas */}
        <View style={styles.entriesSection}>
          <Text style={styles.sectionTitle}>
            Historial Médico ({patient.entries.length} entradas)
          </Text>

          {patient.entries.length === 0 ? (
            <Text style={styles.infoValue}>
              No hay entradas médicas registradas.
            </Text>
          ) : (
            patient.entries.map((entry, index) => (
              <View
                key={entry.id}
                style={styles.entryContainer}
                break={index > 0 && index % 3 === 0}
              >
                <View style={styles.entryHeader}>
                  <Text style={styles.entryType}>
                    {getEntryTypeLabel(entry.type)}
                  </Text>
                  <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
                </View>

                <View style={styles.entryContent}>
                  <View style={styles.entryField}>
                    <Text style={styles.fieldLabel}>Descripción:</Text>
                    <Text style={styles.fieldValue}>{entry.description}</Text>
                  </View>

                  <View style={styles.entryField}>
                    <Text style={styles.fieldLabel}>Especialista:</Text>
                    <Text style={styles.fieldValue}>
                      Dr. {entry.specialist}
                    </Text>
                  </View>

                  {renderEntryDetails(entry)}

                  {/* Códigos de Diagnóstico */}
                  {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                    <View style={styles.diagnosisContainer}>
                      <Text style={styles.diagnosisTitle}>
                        Códigos de Diagnóstico:
                      </Text>
                      {entry.diagnosisCodes.map((code) => (
                        <View key={code} style={styles.diagnosisItem}>
                          <Text style={styles.diagnosisCode}>{code}</Text>
                          <Text style={styles.diagnosisName}>
                            {getDiagnosisName(code)}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            ))
          )}
        </View>

        {/* Número de página */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages}`
          }
          fixed
        />

        {/* Footer */}
        <Text style={styles.footer}>
          Este documento ha sido generado automáticamente. Contiene información
          médica confidencial del paciente {patient.name}.
        </Text>
      </Page>
    </Document>
  );
};

// Componente principal que proporciona el enlace de descarga
interface PatientPDFProps {
  patient: Patient;
  diagnoses: Diagnose[];
  fileName?: string;
  children?: React.ReactNode;
}

const PatientPDF: React.FC<PatientPDFProps> = ({
  patient,
  diagnoses,
  fileName = `historial-${patient.name.replace(/\s+/g, '-').toLowerCase()}.pdf`,
  children,
}) => {
  return (
    <PDFDownloadLink
      document={<PatientPDFDocument patient={patient} diagnoses={diagnoses} />}
      fileName={fileName}
      className="inline-flex items-center gap-2 px-4 py-2 bg-medical-primary hover:bg-medical-primary-dark text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-medical-primary focus:ring-offset-2"
    >
      {({ loading }) =>
        loading
          ? children || (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                Generando PDF...
              </>
            )
          : children || (
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
