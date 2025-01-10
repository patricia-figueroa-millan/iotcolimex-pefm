import { useState, useEffect } from "react";
import { Notification } from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

// Definición de la interfaz para las alertas
interface Alert {
  alert_id: string;
  alert_type: number;
  description: string;
  created_at: string;
}

const AutoNotification = () => {
  const supabase = useSupabaseClient();
  const [alerts, setAlerts] = useState<Alert[]>([]); // Estado para almacenar las alertas
  const [activeNotifications, setActiveNotifications] = useState<Alert[]>([]); // Estado para las notificaciones activas

  useEffect(() => {
    // Función para obtener las alertas desde Supabase
    const fetchAlerts = async () => {
      const { data, error } = await supabase.from("alerta").select("*");
      if (error) {
        console.error("Error al obtener alertas:", error);
      } else if (data) {
        setAlerts(data);
      }
    };

    fetchAlerts(); // Llamada inicial para obtener las alertas

    // Intervalo para mostrar una notificación aleatoria cada 15 segundos
    const interval = setInterval(() => {
      if (alerts.length > 0) {
        const randomIndex = Math.floor(Math.random() * alerts.length);
        const newAlert = alerts[randomIndex];
        setActiveNotifications((prev) => [...prev, newAlert]);

        // Configurar un temporizador para eliminar la notificación después de 15 segundos
        setTimeout(() => {
          setActiveNotifications((prev) =>
            prev.filter((alert) => alert.alert_id !== newAlert.alert_id)
          );
        }, 15000);
      }
    }, 15000);

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [alerts.length, supabase]); // Dependencias del useEffect

  return (
    <>
      {activeNotifications.map((notification, index) => (
        <Notification
          key={index}
          title={`Alerta: ${notification.alert_id}`}
          color="red"
          onClose={() =>
            setActiveNotifications((prev) =>
              prev.filter((_, i) => i !== index)
            )
          }
          style={{
            position: "fixed",
            bottom: `${20 + index * 70}px`, // Ajusta la posición para apilar las notificaciones
            right: "20px",
            zIndex: 1000,
            width: "300px", // Ajusta el tamaño de las notificaciones
          }}
        >
          {notification.description}
        </Notification>
      ))}
    </>
  );
};

export default AutoNotification;