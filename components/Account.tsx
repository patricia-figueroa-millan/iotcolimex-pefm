import { useState, useEffect } from "react";
import { Grid, Title, Image, Center, Card, Text } from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

type DataType = {
  temperature: number;
  atm_pressure: number;
  rel_humidity: number;
  wind_speed: number;
  soil_moisture: number;
};

export default function Account() {
  const supabase = useSupabaseClient();
  const [meas, setMeas] = useState<DataType | undefined>(undefined);

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

  const metrics = [
    {
      title: "Temperatura",
      value: `${(meas?.temperature || 0).toFixed(2)} °C`,
      description: getTemperatureDescription(meas?.temperature),
      color: "#E67D22",
      icon: "./temperatura.png",
    },
    {
      title: "Presión Atmosférica",
      value: `${(meas?.atm_pressure || 0).toFixed(2)} mbar`,
      description: getPressureDescription(meas?.atm_pressure),
      color: "#86959B",
      icon: "./atmosferico.png",
    },
    {
      title: "Humedad Relativa",
      value: `${(meas?.rel_humidity || 0).toFixed(2)} %`,
      description: getHumidityDescription(meas?.rel_humidity),
      color: "#00A6D6",
      icon: "./humedad.png",
    },
    {
      title: "Velocidad del Viento",
      value: `${(meas?.wind_speed || 0).toFixed(2)} m/s`,
      description: getWindDescription(meas?.wind_speed),
      color: "#73B1B8",
      icon: "./viento.png",
    },
    {
      title: "Humedad del Suelo",
      value: `${(meas?.soil_moisture || 0).toFixed(2)} %`,
      description: getSoilMoistureDescription(meas?.soil_moisture),
      color: "#A77540",
      icon: "./suelo.png",
    },
  ];

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
              shadow="md"
              radius="md"
              withBorder
              style={{
                borderColor: metric.color,
                borderWidth: "2px",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.15)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1.0)")
              }
            >
              <Center>
                <Image src={metric.icon} alt={metric.title} maw={70} />
              </Center>
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
              <Text align="center" style={{ color: metric.color, fontSize: "1.3rem", fontWeight: "bold"}}>
                {metric.description}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
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