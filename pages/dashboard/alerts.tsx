import {
  Table,
  Title,
  TextInput,
  ActionIcon,
  Pagination,
  Card,
  Group,
  Container,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IconFilter } from "@tabler/icons-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  AlertId,
  getAlertIdDescription,
  getAlertTypeLabel,
} from "context/types";
import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";

type LocalAlert = {
  id: number;
  device_id: string;
  alert_id: number;
  alert_type: number;
  description: string;
  created_at: string;
};

export default function AlertsPage() {
  const supabase = useSupabaseClient();
  const [alerts, setAlerts] = useState<LocalAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");
  const [activePage, setActivePage] = useState(1); // Página activa
  const rowsPerPage = 10; // Número de filas por página

  const fetchAlerts = async () => {
    setLoading(true);
    let { data, error } = await supabase
      .from("alerta")
      .select("id, device_id, alert_id, alert_type, description, created_at")
      .order("id", { ascending: false });

    if (error) console.error("Error fetching alerts:", error);
    else setAlerts(data as LocalAlert[]);

    setLoading(false);
  };

  // Configurar suscripción de cambios en tiempo real
  useEffect(() => {
    fetchAlerts();

    // Configurar la suscripción en tiempo real
    const subscription = supabase
      .channel('alerta-changes')
      .on('postgres_changes',
        {
          event: '*', // escuchar todos los eventos (insert, update, delete)
          schema: 'public',
          table: 'alerta'
        },
        (payload) => {
          console.log('Cambio en la tabla alerta:', payload);
          fetchAlerts(); // Actualizar los datos cuando ocurra un cambio
        }
      )
      .subscribe();

    // Limpieza cuando el componente se desmonte
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getAlertColor = (type: number) => {
    switch (type) {
      case 1:
        return "#E67D22"; // Naranja
      case 2:
        return "#86959B"; // Gris
      case 3:
        return "#00A6D6"; // Rojo
      case 4:
        return "#73B1B8"; // Azul celeste
      case 5:
        return "#A77540"; // Marrón
      default:
        return "#ffeb3b"; // Amarillo
    }
  };

  // Calcular el rango de alertas para la página activa
  const startIndex = (activePage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <DashboardLayout>
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Group position="apart">
            <Title order={2} mb="lg">
              📌 Histórico de Alertas
            </Title>
            <Card shadow="xl" padding="lg" radius="md" style={{ maxWidth: 300 }}>
              <Title order={5}>📖 Leyenda</Title>
              <p style={{ color: "#ff9800", fontWeight: "bold" }}>Valor atípico</p>
              <p style={{ color: "#607d8b", fontWeight: "bold" }}>Valor fuera de rango</p>
              <p style={{ color: "#f44336", fontWeight: "bold" }}>Falla de comunicación</p>
            </Card>
          </Group>

          {/* Filtro de fechas */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <TextInput
              placeholder="Ej.: 25/10/2024"
              label="Filtrar por fecha:"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              style={{ width: "200px" }}
            />
            <ActionIcon variant="filled" color="blue" size="lg">
              <IconFilter size={30} />
            </ActionIcon>
          </div>

          {/* Tabla de alertas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Table striped highlightOnHover withBorder withColumnBorders>
              <thead>
                <tr style={{ textAlign: "center", backgroundColor: "#f5f5f5" }}>
                  <th>ID estación</th>
                  <th>Tipo de alerta</th>
                  <th>Variable</th>
                  <th>Detalles</th>
                  <th>Fecha y hora de recuperación</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                      ⏳ Cargando alertas...
                    </td>
                  </tr>
                ) : alerts.length > 0 ? (
                  alerts
                    .filter((alert) =>
                      filterDate
                        ? new Date(alert.created_at).toLocaleDateString() === filterDate
                        : true
                    )
                    .slice(startIndex, endIndex) // Mostrar solo las filas correspondientes a la página activa
                    .map((alert) => (
                      <motion.tr
                        key={alert.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <td>{alert.device_id}</td>
                        <td>{getAlertIdDescription(alert.alert_id)}</td>
                        <td style={{ fontWeight: "bold", color: getAlertColor(alert.alert_type) }}>
                          {getAlertTypeLabel(alert.alert_type)}
                        </td>
                        <td>{alert.description}</td>
                        <td>
                          {new Date(alert.created_at).toLocaleString("es-MX", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </td>
                      </motion.tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                      ❌ No se encontraron alertas.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </motion.div>

          <Pagination
            total={Math.ceil(alerts.length / rowsPerPage)}
            value={activePage}
            onChange={setActivePage}
            mt="lg"
          />
        </motion.div>
      </Container>
    </DashboardLayout>
  );
}
