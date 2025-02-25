import { useState, useEffect } from "react";
import {
  Grid,
  Title,
  Image,
  Center,
  Card,
  Text,
  Box,
  Modal,
} from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// Configurar Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

type DataType = {
  temperature: number;
  atm_pressure: number;
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

export default function Account() {
  const supabase = useSupabaseClient();
  const [meas, setMeas] = useState<DataType | undefined>(undefined);
  const [modalData, setModalData] = useState<MetricType | null>(null);
  const [chartData, setChartData] = useState<{ labels: string[]; datasets: any[] }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      let response = await supabase
        .from("wx_meas")
        .select(
          "temperature, atm_pressure, rel_humidity, wind_speed, soil_moisture"
        )
        .order("id", { ascending: false })
        .limit(1);
      setMeas(response.data?.[0]);
    };
    fetchData();
  }, [supabase]);

  const metrics: MetricType[] = [
    {
      title: "Temperatura",
      value: `${(meas?.temperature || 0).toFixed(2)} °C`,
      description: getTemperatureDescription(meas?.temperature),
      color: "#E67D22",
      icon: "temperatura.ico",
      key: "temperature",
    },
    {
      title: "Presión atmosférica",
      value: `${(meas?.atm_pressure || 0).toFixed(2)} mbar`,
      description: getPressureDescription(meas?.atm_pressure),
      color: "#86959B",
      icon: "atmosferico.png",
      key: "atm_pressure",
    },
    {
      title: "Humedad relativa",
      value: `${(meas?.rel_humidity || 0).toFixed(2)} %`,
      description: getHumidityDescription(meas?.rel_humidity),
      color: "#00A6D6",
      icon: "humedad.png",
      key: "rel_humidity",
    },
    {
      title: "Velocidad del viento",
      value: `${(meas?.wind_speed || 0).toFixed(2)} m/s`,
      description: getWindDescription(meas?.wind_speed),
      color: "#73B1B8",
      icon: "viento.png",
      key: "wind_speed",
    },
    {
      title: "Humedad del suelo",
      value: `${(meas?.soil_moisture || 0).toFixed(2)} %`,
      description: getSoilMoistureDescription(meas?.soil_moisture),
      color: "#A77540",
      icon: "suelo.png",
      key: "soil_moisture",
    },
  ];

  const fetchChartData = async (key: keyof DataType) => {
    const response = await supabase
      .from("wx_meas")
      .select(`created_at, ${key}`)
      .gte("created_at", new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" }).split(",")[0])
      .order("created_at", { ascending: false });

    if (response.data) {
      const labels = response.data.map((d) => new Date(d.created_at).toLocaleTimeString("es-MX", { timeZone: "America/Mexico_City" }));
      const data = response.data.map((d) => {
        if (key in d) {
          return d[key as keyof typeof d]; // Confirma que `key` existe en `d`
        }
        console.error(`La clave ${key} no existe en el objeto`, d);
        return null; // Devuelve `null` si la clave no existe
      }).filter((value): value is number => value !== null); // Filtra valores `null` y garantiza que sean números
      
      setChartData({
        labels,
        datasets: [
          {
            label: metrics.find((m) => m.key === key)?.title,
            data,
            borderColor: metrics.find((m) => m.key === key)?.color,
            backgroundColor: metrics.find((m) => m.key === key)?.color,
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
        style={{
          gap: "20px",
          justifyContent: "flex-start",
        }}
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
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.15)")
                
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1.0)")
              }
              onClick={() => handleCardClick(metric)}
            >
              <Box style={{ position: "absolute", top: "10px", right: "10px" }}>
                <Image src={metric.icon} alt={metric.title} maw={40} />
              </Box>
              <Title order={3} align="center" style={{ color: metric.color }}>
                {metric.title}
              </Title>
              <Text
                align="center"
                weight="bold"
                style={{ fontSize: "2rem", marginTop: "10px" }}
              >
                {metric.value}
              </Text>
              <Text
                align="center"
                style={{
                  color: metric.color,
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                }}
              >
                {metric.description}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Modal */}
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

function getTemperatureDescription(value?: number): string {
  if (!value) return "Sin datos";
  if (value <= 7) return "Muy frío";
  if (value <= 14) return "Fresco";
  if (value <= 21) return "Templado";
  if (value <= 28) return "Cálido";
  if (value <= 35) return "Caliente";
  return "Muy caliente";
}

function getPressureDescription(value?: number): string {
  if (!value) return "Sin datos";
  if (value < 1009) return "Baja";
  if (value <= 1023) return "Normal";
  return "Alta";
}

function getHumidityDescription(value?: number): string {
  if (!value) return "Sin datos";
  if (value < 50) return "Baja";
  if (value <= 80) return "Alta";
  return "Muy alta";
}

function getWindDescription(value?: number): string {
  if (!value) return "Sin datos";
  if (value < 0.5) return "Calmado";
  if (value < 5.5) return "Brisa";
  return "Fuerte";
}

function getSoilMoistureDescription(value?: number): string {
  if (!value) return "Sin datos";
  if (value < 15) return "Muy seco";
  if (value < 30) return "Seco";
  return "Mojado";
}


// import { useState, useEffect } from "react";
// import { Grid, Title, Image, Center, Card, Text, Box } from "@mantine/core";
// import { useSupabaseClient } from "@supabase/auth-helpers-react";
// import { IconBox } from "@tabler/icons-react";

// type DataType = {
//   temperature: number;
//   atm_pressure: number;
//   rel_humidity: number;
//   wind_speed: number;
//   soil_moisture: number;
// };

// export default function Account() {
//   const supabase = useSupabaseClient();
//   const [meas, setMeas] = useState<DataType | undefined>(undefined);

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

//   const metrics = [
//     {
//       title: "Temperatura",
//       value: `${(meas?.temperature || 0).toFixed(2)} °C`,
//       description: getTemperatureDescription(meas?.temperature),
//       color: "#E67D22",
//       icon: "./temperatura.ico",
//     },
//     {
//       title: "Presión Atmosférica",
//       value: `${(meas?.atm_pressure || 0).toFixed(2)} mbar`,
//       description: getPressureDescription(meas?.atm_pressure),
//       color: "#86959B",
//       icon: "./atmosferico.png",
//     },
//     {
//       title: "Humedad Relativa",
//       value: `${(meas?.rel_humidity || 0).toFixed(2)} %`,
//       description: getHumidityDescription(meas?.rel_humidity),
//       color: "#00A6D6",
//       icon: "./humedad.png",
//     },
//     {
//       title: "Velocidad del Viento",
//       value: `${(meas?.wind_speed || 0).toFixed(2)} m/s`,
//       description: getWindDescription(meas?.wind_speed),
//       color: "#73B1B8",
//       icon: "./viento.png",
//     },
//     {
//       title: "Humedad del Suelo",
//       value: `${(meas?.soil_moisture || 0).toFixed(2)} %`,
//       description: getSoilMoistureDescription(meas?.soil_moisture),
//       color: "#A77540",
//       icon: "./suelo.png",
//     },
//   ];

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
//                 overflow: "hidden",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.transform = "scale(1.15)")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.transform = "scale(1.0)")
//               }
//             >
//               {/* <Center>
//                 <Image src={metric.icon} alt={metric.title} maw={40} />
//               </Center> */}
//               <Box style={{ position: "absolute", top: "10", right: "10" }}>
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
//               <Text align="center" style={{ color: metric.color, fontSize: "1.3rem", fontWeight: "bold" }}>
//                 {metric.description}
//               </Text>
//             </Card>
//           </Grid.Col>
//         ))}
//       </Grid>
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