// import { useState, useEffect } from "react";
// import {
//   Grid,
//   Title,
//   Image,
//   Center,
//   Card,
//   Text,
//   Box,
//   Modal,
// } from "@mantine/core";
// import { useSupabaseClient } from "@supabase/auth-helpers-react";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// // Configurar Chart.js
// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// type DataType = {
//   temperature: number;
//   atm_pressure: number;
//   rel_humidity: number;
//   wind_speed: number;
//   soil_moisture: number;
// };

// type MetricType = {
//   title: string;
//   value: string;
//   description: string;
//   color: string;
//   icon: string;
//   key: keyof DataType;
// };

// export default function Account() {
//   const supabase = useSupabaseClient();
//   const [meas, setMeas] = useState<DataType | undefined>(undefined);
//   const [modalData, setModalData] = useState<MetricType | null>(null);
//   const [chartData, setChartData] = useState<{ labels: string[]; datasets: any[] }>({
//     labels: [],
//     datasets: [],
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       let response = await supabase
//         .from("wx_meas")
//         .select(
//           "temperature, atm_pressure, rel_humidity, wind_speed, soil_moisture"
//         )
//         .order("id", { ascending: false })
//         .limit(1);
//       setMeas(response.data?.[0]);
//     };
//     fetchData();
//   }, [supabase]);

//   const metrics: MetricType[] = [
//     {
//       title: "Temperatura",
//       value: `${(meas?.temperature || 0).toFixed(2)} °C`,
//       description: getTemperatureDescription(meas?.temperature),
//       color: "#E67D22",
//       icon: "temperatura.ico",
//       key: "temperature",
//     },
//     {
//       title: "Presión atmosférica",
//       value: `${(meas?.atm_pressure || 0).toFixed(2)} mbar`,
//       description: getPressureDescription(meas?.atm_pressure),
//       color: "#86959B",
//       icon: "atmosferico.png",
//       key: "atm_pressure",
//     },
//     {
//       title: "Humedad relativa",
//       value: `${(meas?.rel_humidity || 0).toFixed(2)} %`,
//       description: getHumidityDescription(meas?.rel_humidity),
//       color: "#00A6D6",
//       icon: "humedad.png",
//       key: "rel_humidity",
//     },
//     {
//       title: "Velocidad del viento",
//       value: `${(meas?.wind_speed || 0).toFixed(2)} m/s`,
//       description: getWindDescription(meas?.wind_speed),
//       color: "#73B1B8",
//       icon: "viento.png",
//       key: "wind_speed",
//     },
//     {
//       title: "Humedad del suelo",
//       value: `${(meas?.soil_moisture || 0).toFixed(2)} %`,
//       description: getSoilMoistureDescription(meas?.soil_moisture),
//       color: "#A77540",
//       icon: "suelo.png",
//       key: "soil_moisture",
//     },
//   ];

//   const fetchChartData = async (key: keyof DataType) => {
//     const response = await supabase
//       .from("wx_meas")
//       .select(`created_at, ${key}`)
//       .gte("created_at", new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" }).split(",")[0])
//       .order("created_at", { ascending: false });

//     if (response.data) {
//       const labels = response.data.map((d) => new Date(d.created_at).toLocaleTimeString("es-MX", { timeZone: "America/Mexico_City" }));
//       const data = response.data.map((d) => {
//         if (key in d) {
//           return d[key as keyof typeof d]; // Confirma que `key` existe en `d`
//         }
//         console.error(`La clave ${key} no existe en el objeto`, d);
//         return null; // Devuelve `null` si la clave no existe
//       }).filter((value): value is number => value !== null); // Filtra valores `null` y garantiza que sean números
      
//       setChartData({
//         labels,
//         datasets: [
//           {
//             label: metrics.find((m) => m.key === key)?.title,
//             data,
//             borderColor: metrics.find((m) => m.key === key)?.color,
//             backgroundColor: metrics.find((m) => m.key === key)?.color,
//             fill: false,
//           },
//         ],
//       });
//     }
//   };

//   const handleCardClick = (metric: MetricType) => {
//     setModalData(metric);
//     fetchChartData(metric.key);
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <Grid
//         gutter="xl"
//         justify="center"
//         align="stretch"
//         style={{
//           gap: "20px",
//           justifyContent: "flex-start",
//         }}
//       >
//         {metrics.map((metric, index) => (
//           <Grid.Col key={index} xs={12} sm={6} md={4}>
//             <Card
//               shadow="lg"
//               radius="md"
//               withBorder
//               style={{
//                 borderColor: metric.color,
//                 borderWidth: "2px",
//                 transition: "transform 0.3s ease-in-out",
//                 position: "relative",
//                 cursor: "pointer",
//                 overflow: "hidden",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.transform = "scale(1.15)")
                
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.transform = "scale(1.0)")
//               }
//               onClick={() => handleCardClick(metric)}
//             >
//               <Box style={{ position: "absolute", top: "10px", right: "10px" }}>
//                 <Image src={metric.icon} alt={metric.title} maw={40} />
//               </Box>
//               <Title order={3} align="center" style={{ color: metric.color }}>
//                 {metric.title}
//               </Title>
//               <Text
//                 align="center"
//                 weight="bold"
//                 style={{ fontSize: "2rem", marginTop: "10px" }}
//               >
//                 {metric.value}
//               </Text>
//               <Text
//                 align="center"
//                 style={{
//                   color: metric.color,
//                   fontSize: "1.3rem",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {metric.description}
//               </Text>
//             </Card>
//           </Grid.Col>
//         ))}
//       </Grid>

//       {/* Modal */}
//       <Modal
//         opened={!!modalData}
//         onClose={() => setModalData(null)}
//         title={modalData?.title}
//         size="lg"
//         centered
//       >
//         <Line data={chartData} />
//       </Modal>
//     </div>
//   );
// }

// function getTemperatureDescription(value?: number): string {
//   if (!value) return "Sin datos";
//   if (value <= 7) return "Muy frío";
//   if (value <= 14) return "Fresco";
//   if (value <= 21) return "Templado";
//   if (value <= 28) return "Cálido";
//   if (value <= 35) return "Caliente";
//   return "Muy caliente";
// }

// function getPressureDescription(value?: number): string {
//   if (!value) return "Sin datos";
//   if (value < 1009) return "Baja";
//   if (value <= 1023) return "Normal";
//   return "Alta";
// }

// function getHumidityDescription(value?: number): string {
//   if (!value) return "Sin datos";
//   if (value < 50) return "Baja";
//   if (value <= 80) return "Alta";
//   return "Muy alta";
// }

// function getWindDescription(value?: number): string {
//   if (!value) return "Sin datos";
//   if (value < 0.5) return "Calmado";
//   if (value < 5.5) return "Brisa";
//   return "Fuerte";
// }

// function getSoilMoistureDescription(value?: number): string {
//   if (!value) return "Sin datos";
//   if (value < 15) return "Muy seco";
//   if (value < 30) return "Seco";
//   return "Mojado";
// }


import { useState, useEffect, useMemo } from "react";
import {
  Grid,
  Title,
  Image,
  Card,
  Text,
  Box,
  Modal,
} from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

type DataType = {
  temperature: number;
  atm_pressure: number;       // mbar (hPa)
  rel_humidity: number;
  wind_speed: number;
  soil_moisture: number;
};

type MetricType = {
  title: string;
  value: string;
  description: string;
  color: string;
  icon: string;
  key: keyof DataType;
};

const TECOMAN = { lat: 18.9146, lon: -103.8750 };
const MX_TZ = "America/Mexico_City";

// --- Helpers de presión (Open-Meteo) ---
async function fetchCurrentPressureMbar() {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(TECOMAN.lat));
  url.searchParams.set("longitude", String(TECOMAN.lon));
  url.searchParams.set("current", "pressure_msl");
  url.searchParams.set("timezone", MX_TZ);

  const r = await fetch(url.toString());
  if (!r.ok) throw new Error("No se pudo obtener presión actual");
  const j = await r.json();
  const p = j?.current?.pressure_msl;
  if (typeof p !== "number") throw new Error("Respuesta sin presión");
  return p as number; // hPa ~= mbar
}

async function fetchTodayPressureSeries() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const today = `${y}-${m}-${d}`;

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(TECOMAN.lat));
  url.searchParams.set("longitude", String(TECOMAN.lon));
  url.searchParams.set("hourly", "pressure_msl");
  url.searchParams.set("timezone", MX_TZ);
  // un pequeño margen: ayer + hoy (por si cruza medianoche)
  url.searchParams.set("past_days", "1");
  url.searchParams.set("forecast_days", "1");

  const r = await fetch(url.toString());
  if (!r.ok) throw new Error("No se pudo obtener serie de presión");
  const j = await r.json();
  const times: string[] = j?.hourly?.time ?? [];
  const vals: number[] = j?.hourly?.pressure_msl ?? [];

  // Filtra solo las horas de hoy (TZ MX)
  const labels: string[] = [];
  const data: number[] = [];
  for (let i = 0; i < times.length; i++) {
    const t = times[i];
    if (t.startsWith(today)) {
      labels.push(new Date(t).toLocaleTimeString("es-MX", { timeZone: MX_TZ }));
      data.push(vals[i]);
    }
  }
  return { labels, data }; // mbar/hPa
}

export default function Account() {
  const supabase = useSupabaseClient();
  const [meas, setMeas] = useState<DataType | undefined>(undefined);
  const [externalPressure, setExternalPressure] = useState<number | null>(null);
  const [modalData, setModalData] = useState<MetricType | null>(null);
  const [chartData, setChartData] = useState<{ labels: string[]; datasets: any[] }>({
    labels: [],
    datasets: [],
  });

  // Última medición de DB
  const fetchLatestDbMeas = async () => {
    const { data, error } = await supabase
      .from("wx_meas")
      .select("temperature, atm_pressure, rel_humidity, wind_speed, soil_moisture")
      .order("id", { ascending: false })
      .limit(1);
    if (!error) setMeas(data?.[0]);
  };

  // Presión externa (Tecomán) y fusión al estado
  const refreshExternalPressure = async () => {
    try {
      const p = await fetchCurrentPressureMbar();
      setExternalPressure(p);
    } catch (e) {
      console.error(e);
    }
  };

  // Carga inicial
  useEffect(() => {
    (async () => {
      await fetchLatestDbMeas();
      await refreshExternalPressure();
    })();
  }, []);

  // Suscripción Realtime: cada INSERT en wx_meas refresca DB + presión externa
  useEffect(() => {
    const channel = supabase
      .channel("wx_meas_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "wx_meas" },
        async () => {
          await fetchLatestDbMeas();
          await refreshExternalPressure();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Construye las métricas (inyectando presión externa si existe)
  const effectiveMeas: DataType | undefined = useMemo(() => {
    if (!meas) return undefined;
    return {
      ...meas,
      atm_pressure: externalPressure ?? meas.atm_pressure, // prioriza internet
    };
  }, [meas, externalPressure]);

  const metrics: MetricType[] = [
    {
      title: "Temperatura",
      value: `${(effectiveMeas?.temperature ?? 0).toFixed(2)} °C`,
      description: getTemperatureDescription(effectiveMeas?.temperature),
      color: "#E67D22",
      icon: "temperatura.ico",
      key: "temperature",
    },
    {
      title: "Presión atmosférica",
      value: `${(effectiveMeas?.atm_pressure ?? 0).toFixed(2)} mbar`,
      description: getPressureDescription(effectiveMeas?.atm_pressure),
      color: "#86959B",
      icon: "atmosferico.png",
      key: "atm_pressure",
    },
    {
      title: "Humedad relativa",
      value: `${(effectiveMeas?.rel_humidity ?? 0).toFixed(2)} %`,
      description: getHumidityDescription(effectiveMeas?.rel_humidity),
      color: "#00A6D6",
      icon: "humedad.png",
      key: "rel_humidity",
    },
    {
      title: "Velocidad del viento",
      value: `${(effectiveMeas?.wind_speed ?? 0).toFixed(2)} m/s`,
      description: getWindDescription(effectiveMeas?.wind_speed),
      color: "#73B1B8",
      icon: "viento.png",
      key: "wind_speed",
    },
    {
      title: "Humedad del suelo",
      value: `${(effectiveMeas?.soil_moisture ?? 0).toFixed(2)} %`,
      description: getSoilMoistureDescription(effectiveMeas?.soil_moisture),
      color: "#A77540",
      icon: "suelo.png",
      key: "soil_moisture",
    },
  ];

  // Gráfica: si es presión, usa Open-Meteo (hoy); si no, usa wx_meas (hoy)
  const fetchChartData = async (key: keyof DataType) => {
    if (key === "atm_pressure") {
      try {
        const series = await fetchTodayPressureSeries();
        setChartData({
          labels: series.labels,
          datasets: [
            {
              label: "Presión atmosférica",
              data: series.data,
              borderColor: "#86959B",
              backgroundColor: "#86959B",
              fill: false,
            },
          ],
        });
      } catch (e) {
        console.error(e);
        setChartData({ labels: [], datasets: [] });
      }
      return;
    }

    const todayDateStr = new Date().toLocaleDateString("es-MX", { timeZone: MX_TZ });
    const { data, error } = await supabase
      .from("wx_meas")
      .select(`created_at, ${key}`)
      .gte("created_at", todayDateStr) // hoy en MX
      .order("created_at", { ascending: true });

    if (!error && data) {
      const labels = data.map((d: any) =>
        new Date(d.created_at).toLocaleTimeString("es-MX", { timeZone: MX_TZ })
      );
      const values = data
        .map((d: any) => (key in d ? (d[key] as number) : null))
        .filter((v: number | null): v is number => v !== null);

      const color = metrics.find((m) => m.key === key)?.color ?? "#777";
      const title = metrics.find((m) => m.key === key)?.title ?? String(key);

      setChartData({
        labels,
        datasets: [
          {
            label: title,
            data: values,
            borderColor: color,
            backgroundColor: color,
            fill: false,
          },
        ],
      });
    }
  };

  const handleCardClick = (metric: MetricType) => {
    setModalData(metric);
    fetchChartData(metric.key);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Grid
        gutter="xl"
        justify="center"
        align="stretch"
        style={{ gap: "20px", justifyContent: "flex-start" }}
      >
        {metrics.map((metric, index) => (
          <Grid.Col key={index} xs={12} sm={6} md={4}>
            <Card
              shadow="lg"
              radius="md"
              withBorder
              style={{
                borderColor: metric.color,
                borderWidth: "2px",
                transition: "transform 0.3s ease-in-out",
                position: "relative",
                cursor: "pointer",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
              onClick={() => handleCardClick(metric)}
            >
              <Box style={{ position: "absolute", top: "10px", right: "10px" }}>
                <Image src={metric.icon} alt={metric.title} maw={40} />
              </Box>
              <Title order={3} align="center" style={{ color: metric.color }}>
                {metric.title}
              </Title>
              <Text align="center" style={{ fontSize: "2rem", marginTop: "10px", fontWeight: 700 }}>
                {metric.value}
              </Text>
              <Text
                align="center"
                style={{ color: metric.color, fontSize: "1.3rem", fontWeight: "bold" }}
              >
                {metric.description}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Modal
        opened={!!modalData}
        onClose={() => setModalData(null)}
        title={modalData?.title}
        size="lg"
        centered
      >
        <Line data={chartData} />
      </Modal>
    </div>
  );
}

// --- Descriptores ---
function getTemperatureDescription(value?: number): string {
  if (value === undefined || value === null) return "Sin datos";
  if (value <= 7) return "Muy frío";
  if (value <= 14) return "Fresco";
  if (value <= 21) return "Templado";
  if (value <= 28) return "Cálido";
  if (value <= 35) return "Caliente";
  return "Muy caliente";
}

function getPressureDescription(value?: number): string {
  if (value === undefined || value === null) return "Sin datos";
  if (value < 1009) return "Baja";
  if (value <= 1023) return "Normal";
  return "Alta";
}

function getHumidityDescription(value?: number): string {
  if (value === undefined || value === null) return "Sin datos";
  if (value < 50) return "Baja";
  if (value <= 80) return "Alta";
  return "Muy alta";
}

function getWindDescription(value?: number): string {
  if (value === undefined || value === null) return "Sin datos";
  if (value < 0.5) return "Calmado";
  if (value < 5.5) return "Brisa";
  return "Fuerte";
}

function getSoilMoistureDescription(value?: number): string {
  if (value === undefined || value === null) return "Sin datos";
  if (value < 15) return "Muy seco";
  if (value < 30) return "Seco";
  return "Mojado";
}
