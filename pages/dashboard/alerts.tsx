import {
  Table,
  Badge,
  Title,
  TextInput,
  ActionIcon,
  Pagination,
  Card,
  Group,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IconFilter } from "@tabler/icons-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  AlertId,
  getAlertIdDescription,
  getAlertTypeLabel,
} from "../../context/types";
import DashboardLayout from "@/components/DashboardLayout";

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
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching alerts:", error);
    else setAlerts(data as LocalAlert[]);

    setLoading(false);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const getBadgeProps = (type: number) => {
    return {
      label: getAlertTypeLabel(type),
      color:
        type === 1
          ? "orange"
          : type === 2
            ? "gray"
            : type === 3
              ? "blue"
              : type === 4
                ? "aquamarine"
                : type === 5
                  ? "brown"
                  : "yellow",
    };
  };

  const getAlertIdLabel = (alertId: AlertId) => {
    return getAlertIdDescription(alertId);
  };

  // Calcular el rango de alertas para la página activa
  const startIndex = (activePage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <DashboardLayout>
      <div style={{ padding: "20px" }}>
        <Group position="apart">
          <Title order={2} mb="lg">
            Histórico de alertas lanzadas
          </Title>
          <Card shadow="sm" padding="lg" radius="md" style={{ maxWidth: 300 }}>
            <Title order={5}>Leyenda</Title>
            <Badge color="orange">Valor atípico</Badge>
            <Badge color="gray" mt="sm">
              Valor fuera de rango
            </Badge>
            <Badge color="red" mt="sm">
              Falla de comunicación
            </Badge>
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
            style={{ gap: "10px" }}
          />
          <ActionIcon variant="light" color="blue" size="lg">
            <IconFilter size={30} />
          </ActionIcon>
        </div>

        {/* Tabla de alertas */}
        <Table highlightOnHover withBorder>
          <thead>
            <tr style={{ textAlign: "center" }}>
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
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Cargando alertas...
                </td>
              </tr>
            ) : alerts.length > 0 ? (
              alerts
                .filter((alert) =>
                  filterDate
                    ? new Date(alert.created_at).toLocaleDateString() ===
                      filterDate
                    : true,
                )
                .slice(startIndex, endIndex) // Mostrar solo las filas correspondientes a la página activa
                .map((alert) => {
                  const badgeProps = getBadgeProps(alert.alert_type);

                  return (
                    <tr key={alert.id}>
                      <td>{alert.device_id}</td>
                      <td>{getAlertIdLabel(alert.alert_id)}</td>
                      <td>
                        <Badge color={badgeProps.color} variant="filled">
                          {badgeProps.label}
                        </Badge>
                      </td>
                      <td>{alert.description}</td>
                      <td>
                        {new Date(alert.created_at).toLocaleString("es-MX", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No se encontraron alertas.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <Pagination
          total={Math.ceil(alerts.length / rowsPerPage)}
          value={activePage}
          onChange={setActivePage}
          mt="lg"
        />
      </div>
    </DashboardLayout>
  );
}
