import { useEffect, useState } from "react";
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
  const [activeNotification, setActiveNotification] = useState<Alert | null>(null); // Estado para la notificación activa

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
        setActiveNotification(alerts[randomIndex]);
      }
    }, 15000);

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [alerts.length, supabase]); // Dependencias del useEffect

  return (
    <>
      {activeNotification && (
        <Notification
          title={`Alerta: ${activeNotification.alert_id}`}
          color="red"
          onClose={() => setActiveNotification(null)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          {activeNotification.description}
        </Notification>
      )}
    </>
  );
};

export default AutoNotification;


/////////////////////////////////////////////////// Sección antigua
// import { useEffect, useState } from "react";
// import { Notification } from "@mantine/core";
// import { useSupabaseClient } from "@supabase/auth-helpers-react";

// type DataType = {
//     alert_id: string;
//     alert_type: number;
//     description: string;
//     created_at: string;
// }
// const AutoNotification = () => {
//     const supabase = useSupabaseClient();
//     const [alerts, setAlerts] = useState<DataType | undefined>(undefined);
//     // const initNotifications: IActiveNotification = {
//     //     alert_id: "",
//     //     alert_type: 0,
//     //     description: "",
//     //     created_at: ""
//     // }
//     // const [activeNotification, setActiveNotification] = useState<DataType | null>(null);
    
//     // useEffect(() => {
//     //     const fetchAlerts = async () => {
//     //       const { data, error } = await supabase.from("alerts").select();
//     //       if (error) {
//     //         console.error("Error al obtener alertas:", error);
//     //       } else {
//     //         setAlerts(data);
//     //         console.log("Datos de alerta: ", data);
//     //       }
//     //     };
      
//     //     fetchAlerts();
    
//     useEffect(() => {
//         const fetchData = async () => {
//           let response = await supabase
//             .from("alerts")
//             .select();
//           setAlerts(response.data?.[0]);
//         };
//         fetchData();
//       }, [supabase]);

//         const interval = setInterval(() => {
//           if (alerts.length > 0) {
//             const randomIndex = Math.floor(Math.random() * alerts.length);
//             setAlerts(alerts[randomIndex]);
//           }
//         }, 15000);
      
//         return () => clearInterval(interval);
//       }, [supabase]);
      

//       return (
//         <>
//           {activeNotification && (
//             <Notification
//               title={`Alerta: ${activeNotification.alert_id}`}
//               color="red"
//               onClose={() => setActiveNotification(null)}
//               style={{
//                 position: "fixed",
//                 bottom: "20px",
//                 right: "20px",
//                 zIndex: 1000,
//               }}
//             >
//               {activeNotification.description}
//             </Notification>
//           )}
//         </>
//       );
      
// };

// export default AutoNotification;
