import { useEffect } from "react";
import { connect, MqttClient } from "mqtt";
import { showNotification } from "@mantine/notifications";
import { color } from "d3-color";
import { Icon12Hours, Icon360View, IconAlarm, IconAlertCircle, IconAlertCircleFilled, IconAlertCircleOff, IconAlertSmall, IconAlertSquareRounded, IconFileAlert } from "@tabler/icons-react";


const AutoNotification = () => {
  const broker_url = process.env.NEXT_PUBLIC_BROKER_URI as string;
  const topic = process.env.NEXT_PUBLIC_MQTT_TOPIC as string;

  // Función para asignar un color dependiendo del tipo de alerta
  const getNotificationColor = (alertId: number) => {
    switch (alertId) {
      case 1: // Valor atípico
        return "orange";
      case 2: // Valor fuera de rango
        return "blue";
      case 3: // Falla de comunicación
        return "red";
      default:
        return "gray";
    }
  };

  const getNotificationId = (alertId: number) => {
    switch (alertId) {
      case 1: // Valor atípico
        return "valor atípico";
      case 2: // Valor fuera de rango
        return "valor fuera de rango";
      case 3: // Falla de comunicación
        return "falla de comunicación";
      default:
        return "Falla desconocida";
    }
  }

  const getTitleColor = (alertId: number) => {
    switch (alertId) {
      case 1: // Valor atípico
        return "orange";
      case 2: // Valor fuera de rango
        return "blue";
      case 3: // Falla de comunicación
        return "red";
      default:
        return "gray";
    }
  };

  useEffect(() => {
    // Conexión al broker MQTT
    const client: MqttClient = connect(broker_url, {
      clientId: `web_client_${Math.random().toString(16).substring(2, 8)}`,
    });

    client.on("connect", () => {
      console.log("Conectado al broker MQTT");

      if (!client.connected) {
        console.error("El cliente MQTT no está conectado.");
        return;
      }

      client.subscribe(topic, (err) => {
        if (err) {
          console.error("Error al suscribirse al tópico:", err);
        } else {
          console.log(`Suscrito al tópico: ${topic}`);
        }
      });
    });

    // Escuchar mensajes del tópico
    client.on("message", (topic, message) => {
      try {
        const alertMessage = message.toString(); // Mensaje recibido como texto plano
        console.log("Mensaje recibido desde MQTT:", alertMessage);

        // Parsear las alertas recibidas
        const alertRecords = JSON.parse(alertMessage);

        // Mostrar una notificación por cada alerta disparada
        alertRecords.forEach((alert: { alert_id: number; description: string }) => {
          showNotification({
            title: <div style={{ fontWeight: 'bold' }}>
              Nueva alerta: <div style={{ color: getTitleColor(alert.alert_id) }}>
                {getNotificationId(alert.alert_id)}
              </div>
            </div>, // Título de la alerta
            message: <div className="notification">
              {alert.description}
            </div>, // Descripción de la alerta
            color: getNotificationColor(alert.alert_id), // Color según tipo de alerta
            autoClose: 10000, // Cerrar la notificación después de 10 segundos
            icon: alert.alert_id === 1 ? <IconAlertCircleFilled /> : alert.alert_id === 2 ? <IconAlertCircle /> : <IconAlertSquareRounded />, // Icono de la notificación
          });
        });
      } catch (error) {
        console.error("Error al procesar el mensaje:", error);
      }
    });

    return () => {
      client.end();
    };
  }, [broker_url, topic]);

  return null; // Este componente no renderiza nada
};

export default AutoNotification;
