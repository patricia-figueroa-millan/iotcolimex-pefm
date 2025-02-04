import React from "react";
import { Modal, Title, Text, Badge, Button } from "@mantine/core";
import { Alert, getAlertIdDescription, getAlertTypeLabel } from "../context/types"; // Importa el archivo types.ts

interface ModalComponentProps {
  alert: Alert;
  isOpen: boolean;
  onClose: () => void;
}

// Obtener el color de la insignia basado en el tipo de alerta
const getBadgeColor = (alertType: number) => {
  switch (alertType) {
    case 1: // Temperatura
      return "orange";
    case 2: // Presión atmosférica
      return "gray";
    case 3: // Humedad relativa
      return "blue";
    case 4: // Velocidad del viento
      return "aquamarine";
    case 5: // Humedad del suelo
      return "brown";
    default:
      return "yellow"; // Para valores desconocidos
  }
};

const ModalComponent: React.FC<ModalComponentProps> = ({ alert, isOpen, onClose }) => {
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Detalles de la Alerta"
      styles={{
        content: { backgroundColor: "#f8f9fa" },
        title: { fontWeight: 700, fontSize: "20px" },
      }}
    >
      <div style={{ padding: "20px" }}>
        <Title order={4} style={{ marginBottom: "10px" }}>
          ID Alerta: {alert.id}
        </Title>
        <Text style={{ marginBottom: "8px" }}>
          <strong>ID Estación:</strong> {alert.device_id}
        </Text>
        <Text style={{ marginBottom: "8px" }}>
          <strong>Descripción del Tipo de Alerta:</strong>{" "}
          {getAlertIdDescription(alert.alert_id)}
        </Text>
        <Text style={{ marginBottom: "8px" }}>
          <strong>Variable:</strong>{" "}
          <Badge color={getBadgeColor(alert.alert_type)} size="lg">
            {getAlertTypeLabel(alert.alert_type)}
          </Badge>
        </Text>
        <Text style={{ marginBottom: "8px" }}>
          <strong>Descripción:</strong> {alert.description}
        </Text>
        <Text>
          <strong>Fecha y Hora:</strong>{" "}
          {new Date(alert.created_at).toLocaleString("es-MX", {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </Text>
        <Button onClick={onClose} style={{ marginTop: "20px" }}>
          Cerrar
        </Button>
      </div>
    </Modal>
  );
};

export default ModalComponent;
