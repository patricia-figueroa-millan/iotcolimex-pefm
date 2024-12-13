import {
    Table,
    Badge,
    Title,
    TextInput,
    ActionIcon,
    Pagination,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IconFilter } from "@tabler/icons-react";
// @ts-ignore
import { Database } from "../utils/database.types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

type Alert = {
    id: number;
    device_id: string;
    alert_id: string;
    alert_type: number;
    description: string;
    created_at: string;
};

export default function AlertsPage() {
    const supabase = useSupabaseClient<Database>();
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterDate, setFilterDate] = useState("");

    const fetchAlerts = async () => {
        setLoading(true);
        let { data, error } = await supabase
            .from("alerta")
            .select("id, device_id, alert_id, alert_type, description, created_at")
            .order("created_at", { ascending: false });

        if (error) console.error("Error fetching alerts:", error);
        else setAlerts(data as Alert[]);

        setLoading(false);
    };

    useEffect(() => {
        fetchAlerts();
    }, []);

    const getBadgeProps = (type: number) => {
        switch (type) {
            case 1:
                return { color: "yellow", label: "Valor atípico" };
            case 2:
                return { color: "orange", label: "Valor fuera de rango" };
            case 3:
                return { color: "red", label: "Falla de comunicación" };
            default:
                return { color: "gray", label: "Desconocido" };
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <Title order={2} mb="lg">
                Histórico de alertas lanzadas
            </Title>

            {/* Filtro de fechas */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <TextInput
                    placeholder="Ej.: 25/10/2024"
                    label="Alertas del día"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <ActionIcon variant="light" color="blue" size="lg">
                    <IconFilter size={24} />
                </ActionIcon>
            </div>

            {/* Tabla de alertas */}
            <Table highlightOnHover withBorder>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID estación</th>
                        <th>ID alerta</th>
                        <th>Categoría</th>
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
                                    ? new Date(alert.created_at).toLocaleDateString() === filterDate
                                    : true
                            )
                            .map((alert) => {
                                const badgeProps = getBadgeProps(alert.alert_type);

                                return (
                                    <tr key={alert.id}>
                                        <td>{alert.id}</td>
                                        <td>{alert.device_id}</td>
                                        <td>{alert.alert_id}</td>
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
                total={alerts.length > 10 ? Math.ceil(alerts.length / 10) : 1}
                defaultValue={1}
                mt="lg"
            />
        </div>
    );
}
