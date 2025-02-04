// context/types.ts

// Enum para los tipos de alerta
export enum AlertId {
    OUTLIER = 1, // Valor atípico
    OUT_OF_RANGE = 2, // Valor fuera de rango
    COMMUNICATION_FAILURE = 3, // Falla de comunicación
  }
  
  // Función para obtener descripciones del alert_id
  export const getAlertIdDescription = (alertId: AlertId): string => {
    switch (alertId) {
      case AlertId.OUTLIER:
        return "Valor atípico";
      case AlertId.OUT_OF_RANGE:
        return "Valor fuera de rango";
      case AlertId.COMMUNICATION_FAILURE:
        return "Falla de comunicación";
      default:
        return "Desconocido";
    }
  };
  
  // Tipos relacionados con las alertas
  export interface Alert {
    id: number;
    device_id: string;
    alert_id: AlertId;
    alert_type: number;
    description: string;
    created_at: string;
  }
  
  // Función para obtener etiquetas de las variables (categorías)
  export const getAlertTypeLabel = (alertType: number): string => {
    switch (alertType) {
      case 1:
        return "Temperatura";
      case 2:
        return "Presión atmosférica";
      case 3:
        return "Humedad relativa";
      case 4:
        return "Velocidad del viento";
      case 5:
        return "Humedad del suelo";
      default:
        return "Desconocido";
    }
  };
  