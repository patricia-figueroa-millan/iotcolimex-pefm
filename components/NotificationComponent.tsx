import { useEffect } from "react";
import { connect, MqttClient } from "mqtt";
import { showNotification } from "@mantine/notifications";

const AutoNotification = () => {
  const broker_url = process.env.NEXT_PUBLIC_BROKER_URI as string;
  const topic = process.env.NEXT_PUBLIC_MQTT_TOPIC as string; 

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
        const alertMessage = message.toString(); // El mensaje es texto plano
        console.log("Mensaje recibido desde MQTT:", alertMessage);

        // Dividir el mensaje en alertas separadas (suponiendo que estén separadas por comas)
        const individualAlerts = alertMessage.split(",").map((alert) => alert.trim());

        // Mostrar una notificación por alerta disparada
        individualAlerts.forEach((alert) => {
          showNotification({
            title: "Nueva alerta",
            message: alert,
            color: "red",
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
