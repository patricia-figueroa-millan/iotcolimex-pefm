// import { useEffect, useState } from "react";
// import { connect, MqttClient } from "mqtt";
// import { notifications } from "@mantine/notifications";
// import { showNotification } from "@mantine/notifications";
// import { getAlertIdDescription, getAlertTypeLabel, getNotificationColor, getTitleColor, getNotificationId } from "@/context/types";
// import { IconAlertTriangle, IconAlertCircleFilled, IconAlertSquareRounded, IconAlertCircle, IconBellRinging } from "@tabler/icons-react";

// // Configuración del broker MQTT y tópico
// const broker_url = process.env.NEXT_PUBLIC_BROKER_URI as string;
// const topic = process.env.NEXT_PUBLIC_MQTT_TOPIC as string;

// const NotificationComponent = () => {
//   const [client, setClient] = useState<MqttClient | null>(null);
//   const [isConnected, setIsConnected] = useState(false);

//   // Función para asignar un icono a la notificación
//   const getNotificationIcon = (alertId: number) => {
//     switch (alertId) {
//       case 1:
//         return <IconAlertTriangle />;
//       case 2:
//         return <IconAlertCircle />;
//       case 3:
//         return <IconBellRinging />;
//       default:
//         return <IconAlertCircle />;
//     }
//   };

//   useEffect(() => {
//     console.log("Conectando al broker MQTT...");
//     const mqttClient = connect(broker_url, {
//       clientId: `web_client_${Math.random().toString(16).substring(2, 8)}`,
//       reconnectPeriod: 5000, // Intentar reconectar cada 5 segundos si se desconecta
//     });

//     mqttClient.on("connect", () => {
//       console.log("Conectado al broker MQTT");
//       setIsConnected(true);
//       let retryCount = 0;
//       let isSubscribed = false;

//       const subscribeWithRetry = () => {
//       if (isSubscribed) {
//         console.log("Ya suscrito al tópico, no se intentará resuscribir.");
//         return;
//       }

//       mqttClient.subscribe(topic, (err) => {
//         if (err) {
//         retryCount++;
//         if (retryCount <= 3) {
//           console.warn(`Error al suscribirse al tópico. Reintentando (${retryCount}/3)...`);
//           setTimeout(subscribeWithRetry, 10000); // Reintentar después de 10 segundos
//         } else {
//           console.error("Error al suscribirse al tópico después de 3 intentos:", err);
//         }
//         } else {
//         console.log(`Suscrito al tópico: ${topic}`);
//         isSubscribed = true;
//         }
//       });
//       };

//       subscribeWithRetry(); // Intentar suscribirse inmediatamente
//     });

//     mqttClient.on("message", (receivedTopic, message) => {
//       if (receivedTopic === topic) {
//         try {
//           const alertMessages = JSON.parse(message.toString());


//           console.log("📩 Mensaje recibido desde MQTT:", alertMessages);

//           alertMessages.forEach((alert: { alert_id: number; description: string }) => {
//             showNotification({
//               title: <div style={{ fontWeight: 'bold' }}>
//                 Nueva alerta: <div style={{ color: getTitleColor(alert.alert_id) }}>
//                   {getNotificationId(alert.alert_id)}
//                 </div>
//               </div>, // Título de la alerta
//               message: <div className="notification">
//                 {alert.description}
//               </div>, // Descripción de la alerta
//               color: getNotificationColor(alert.alert_id), // Color según tipo de alerta
//               autoClose: 10000, // Cerrar la notificación después de 10 segundos
//               icon: alert.alert_id === 1 ? <IconAlertCircleFilled /> : alert.alert_id === 2 ? <IconAlertCircle /> : <IconAlertSquareRounded />, // Icono de la notificación
//             });
//           });
//           // alertMessages.map((alert: { alert_id: number; description: string }) => {
//           //   showNotification({
//           //     title: "Nueva alerta",
//           //     message: alert.description,
//           //     color: getNotificationColor(alert.alert_id),
//           //     autoClose: 10000,
//           //     icon: getNotificationIcon(alert.alert_id),
//           //   });
//           // });
//         } catch (error) {
//           console.error("⚠️ Error al procesar el mensaje MQTT:", error);
//         }
//       }
//     });

//     mqttClient.on("error", (err) => {
//       console.error("⚠️ Error en la conexión MQTT:", err);
//       setIsConnected(false);
//     });

//     mqttClient.on("offline", () => {
//       console.warn("⚠️ Cliente MQTT desconectado");
//       setIsConnected(false);
//     });

//     setClient(mqttClient);

//     return () => {
//       console.log("🔌 Desconectando MQTT...");
//       mqttClient.end();
//     };
//   }, []);

//   return null; // No renderiza nada, solo escucha mensajes MQTT
// };

// export default NotificationComponent;

"use client";
import { useEffect, useState } from "react";
import { connect, MqttClient } from "mqtt";
import { showNotification } from "@mantine/notifications";
import { getNotificationColor, getTitleColor, getNotificationId } from "@/context/types";
import {
  IconAlertTriangle,
  IconAlertCircleFilled,
  IconAlertSquareRounded,
  IconAlertCircle,
  IconBellRinging,
} from "@tabler/icons-react";

// Configuración del broker MQTT y tópico
const broker_url = process.env.NEXT_PUBLIC_BROKER_URI as string;
const topic = process.env.NEXT_PUBLIC_MQTT_TOPIC as string;

// === Helper de fecha en zona MX, formato humano (ej: 01/10/25 15:42:33)
const mxHumanDateTime = () => {
  return new Date().toLocaleString("es-MX", {
    timeZone: "America/Mexico_City",
    dateStyle: "short",
    timeStyle: "medium",
  });
};

const NotificationComponent = () => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Función para asignar un icono a la notificación
  const getNotificationIcon = (alertId: number) => {
    switch (alertId) {
      case 1:
        return <IconAlertTriangle />;
      case 2:
        return <IconAlertCircle />;
      case 3:
        return <IconBellRinging />;
      default:
        return <IconAlertCircle />;
    }
  };

  useEffect(() => {
    console.log("Conectando al broker MQTT...");
    const mqttClient = connect(broker_url, {
      clientId: `web_client_${Math.random().toString(16).substring(2, 8)}`,
      reconnectPeriod: 5000,
    });

    mqttClient.on("connect", () => {
      console.log("Conectado al broker MQTT");
      setIsConnected(true);

      mqttClient.subscribe(topic, (err) => {
        if (err) {
          console.error("Error al suscribirse al tópico:", err);
        } else {
          console.log(`Suscrito al tópico: ${topic}`);
        }
      });
    });

    mqttClient.on("message", (receivedTopic, message) => {
      if (receivedTopic === topic) {
        try {
          const alertMessages = JSON.parse(message.toString());
          console.log("📩 Mensaje recibido desde MQTT:", alertMessages);

          alertMessages.forEach((alert: { alert_id: number; description: string }) => {
            const receivedAt = mxHumanDateTime(); //  fecha/hora de recepción

            showNotification({ 
              title: (
                <div style={{ fontWeight: "bold" }}>
                  Nueva alerta:{" "}
                  <div style={{ color: getTitleColor(alert.alert_id) }}>
                    {getNotificationId(alert.alert_id)}
                  </div>
                </div>
              ),
              message: (
                <div className="notification">
                  <div style={{ whiteSpace: "pre-wrap" }}>{alert.description}</div>
                  <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
                    <strong>Recibida:</strong> {receivedAt}
                  </div>
                </div>
              ),
              color: getNotificationColor(alert.alert_id),
              autoClose: 10000,
              icon: getNotificationIcon(alert.alert_id),
            });
          });
        } catch (error) {
          console.error("⚠️ Error al procesar el mensaje MQTT:", error);
        }
      }
    });

    mqttClient.on("error", (err) => {
      console.error("⚠️ Error en la conexión MQTT:", err);
      setIsConnected(false);
    });

    mqttClient.on("offline", () => {
      console.warn("⚠️ Cliente MQTT desconectado");
      setIsConnected(false);
    });

    setClient(mqttClient);

    return () => {
      console.log("🔌 Desconectando MQTT...");
      mqttClient.end();
    };
  }, []);

  return null; // No renderiza nada, solo escucha mensajes MQTT
};

export default NotificationComponent;
