import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { getEntryTypeLabel, getHealthRatingLabel } from '@/utils/entry-labels';
import { formatDate } from '@/utils/format-date';

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

const PatientPDFDocument: React.FC<PatientPDFProps> = ({ patient }) => {
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
            Generado el {formatDate(new Date().toISOString())}
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
                </View>
                {renderEntryDetails(entry)}
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

export default PatientPDFDocument;
