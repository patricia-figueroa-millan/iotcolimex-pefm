import React from "react";
import { Modal, Title, Text, Badge, Button } from "@mantine/core";

interface Alert {
  id: string;
  device_id: string;
  alert_id: string;
  alert_type: number;
  description: string;
  created_at: string;
}

interface ModalComponentProps {
  alert: Alert;
  isOpen: boolean;
  onClose: () => void;
}

const getBadgeColor = (alertType: string) => {
  switch (alertType) {
    case "1":
      return "red";
    case "2":
      return "yellow";
    case "3":
      return "green";
    default:
      return "gray";
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
          <strong>ID Alerta:</strong> {alert.alert_id}
        </Text>
        <Text style={{ marginBottom: "8px" }}>
          <strong>Categoría:</strong>{" "}
          <Badge color={getBadgeColor(String(alert.alert_type))} size="lg">
            {alert.alert_type}
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
