import { useState, useEffect } from "react";
import { Notification } from "@mantine/core";
import { connect, MqttClient } from "mqtt";
import { showNotification } from "@mantine/notifications";

interface Alert {
  created_at: Date;
  device_id: string;
  device_name: string;
  temperature: number;
  atm_pressure: number;
  rel_humidity: number;
  wind_speed: number;
  soil_moisture: number;
}

const AutoNotification = () => {
  const [activeNotifications, setActiveNotifications] = useState<Alert[]>([]); // Estado para las notificaciones activas
  const broker_url = process.env.NEXT_PUBLIC_BROKER_URI as string;
  const topic = process.env.NEXT_PUBLIC_MQTT_TOPIC as string;

  useEffect(() => {
    // Conexión al broker MQTT
    const client: MqttClient = connect(broker_url, {
      clientId: `web_client_${Math.random().toString(16).substring(2, 8)}`,
    });

    client.on("connect", () => {
      console.log("Conectado al broker MQTT");
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
        const data = JSON.parse(message.toString()); // Deserializar JSON
        const parsedMessage: Alert = {
          created_at: data.H, // Agregar timestamp de recepción
          device_id: data.ID, // ID del dispositivo
          device_name: data.N,
          temperature: data.T,
          atm_pressure: data.P,
          rel_humidity: data.HR,
          wind_speed: data.V,
          soil_moisture: data.HS,
        };

        console.log("Mensaje recibido:", parsedMessage);

        // Agregar la notificación al estado
        setActiveNotifications((prevNotifications) => [...prevNotifications, parsedMessage]);

        // Mostrar notificación
        showNotification({
          title: `Nueva notificación: ${data.device_name}`,
          message: `Dispositivo: ${data.temperature}, Temperatura: ${data.rel_humidity}`,
          color: "blue",
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