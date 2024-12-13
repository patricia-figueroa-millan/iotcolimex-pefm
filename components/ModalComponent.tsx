import React from "react";
import { Modal, Title, Text, Button, Badge } from "@mantine/core";
import { useAlerts } from "../context/AlertsContext";

export default function ModalComponent() {
  const { alerts, removeAlert } = useAlerts();

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "Valor atípico":
        return "yellow";
      case "Valor fuera de rango":
        return "orange";
      case "Falla de comunicación":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <>
      {alerts.map((alert) => (
        <Modal
          key={alert.id}
          opened={true}
          onClose={() => removeAlert(alert.id)}
          title="Detalles de la alerta"
          centered
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
            <Button
              onClick={() => removeAlert(alert.id)}
              fullWidth
              mt="md"
              color="red"
              styles={{
                root: {
                  fontWeight: "bold",
                  backgroundColor: "#e74c3c",
                  "&:hover": { backgroundColor: "#c0392b" },
                },
              }}
            >
              Cerrar
            </Button>
          </div>
        </Modal>
      ))}
    </>
  );
}
