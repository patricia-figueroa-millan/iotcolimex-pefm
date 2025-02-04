// import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import {
//   HeatMap,
//   ResponsiveContainer,
//   Tooltip,
//   Legend,
// } from "recharts";
// import { Title, Container } from "@mantine/core";
// import * as tf from "@tensorflow/tfjs";
// import { RandomForestClassifier } from "random-forest-classifier";

// // Configura Supabase
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
// const supabase = createClient(supabaseUrl, supabaseKey);

// type DataType = {
//   created_at: string;
//   temperature: number;
//   atm_pressure: number;
//   rel_humidity: number;
//   wind_speed: number;
//   soil_moisture: number;
// };

// type MonthlyImpact = {
//   month: string;
//   temperature: number;
//   atm_pressure: number;
//   rel_humidity: number;
//   wind_speed: number;
//   soil_moisture: number;
// };

// export default function MonthlyImpactVisualization() {
//   const [monthlyData, setMonthlyData] = useState<MonthlyImpact[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const { data, error } = await supabase
//         .from("wx_meas")
//         .select(
//           "created_at, temperature, atm_pressure, rel_humidity, wind_speed, soil_moisture"
//         );

//       if (error) {
//         console.error("Error fetching data from Supabase:", error);
//         return;
//       }

//       // Prepara los datos agrupados por mes
//       const preparedData = data?.map((row) => ({
//         ...row,
//         month: new Date(row.created_at).getMonth() + 1,
//       }));

//       const groupedData: { [key: string]: DataType[] } = {};
//       preparedData?.forEach((row) => {
//         const month = row.month;
//         if (!groupedData[month]) {
//           groupedData[month] = [];
//         }
//         groupedData[month].push(row);
//       });

//       const monthlyImpacts: MonthlyImpact[] = [];

//       for (const [month, rows] of Object.entries(groupedData)) {
//         const features = rows.map((row) => [
//           row.temperature,
//           row.atm_pressure,
//           row.rel_humidity,
//           row.wind_speed,
//           row.soil_moisture,
//         ]);

//         const labels = rows.map((_, index) => index % 4); // Genera etiquetas dummy

//         const rf = new RandomForestClassifier({ n_estimators: 100 });
//         rf.fit(features, labels);

//         const importances = rf.feature_importances_();

//         monthlyImpacts.push({
//           month: month,
//           temperature: importances[0],
//           atm_pressure: importances[1],
//           rel_humidity: importances[2],
//           wind_speed: importances[3],
//           soil_moisture: importances[4],
//         });
//       }

//       setMonthlyData(monthlyImpacts);
//     };

//     fetchData();
//   }, []);

//   return (
//     <Container size="lg" style={{ paddingTop: "20px" }}>
//       <Title order={2} style={{ marginBottom: "20px", textAlign: "center" }}>
//         Impacto Mensual en Variables Climáticas con Random Forest
//       </Title>
//       <ResponsiveContainer width="100%" height={500}>
//         <HeatMap
//           data={monthlyData}
//           xKey="month"
//           yKeys={[
//             "temperature",
//             "atm_pressure",
//             "rel_humidity",
//             "wind_speed",
//             "soil_moisture",
//           ]}
//         />
//       </ResponsiveContainer>
//     </Container>
//   );
// }
