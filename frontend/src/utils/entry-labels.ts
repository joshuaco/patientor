export const getEntryTypeLabel = (type: string): string => {
  switch (type) {
    case 'Hospital':
      return 'Ingreso Hospitalario';
    case 'OccupationalHealthcare':
      return 'Salud Ocupacional';
    case 'HealthCheck':
      return 'Chequeo Médico';
    default:
      return 'Entrada Médica';
  }
};

export const getHealthRatingLabel = (rating: string): string => {
  switch (rating) {
    case '0':
      return 'Saludable';
    case '1':
      return 'Riesgo Bajo';
    case '2':
      return 'Riesgo Alto';
    case '3':
      return 'Riesgo Crítico';
    default:
      return 'No especificado';
  }
};

export const getGenderLabel = (gender: string): string => {
  switch (gender) {
    case 'male':
      return 'Masculino';
    case 'female':
      return 'Femenino';
    default:
      return 'Otro';
  }
};
