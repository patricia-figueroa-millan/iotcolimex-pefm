// import { useSupabaseClient } from "@supabase/auth-helpers-react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/router";
// import { useEffect } from "react";

// const Home = () => {
//   const router = useRouter();
//   const supabase = useSupabaseClient();

//   useEffect(() => {
//     async function getSession() {
//       const { data, error } = await supabase.auth.getSession();
//       if (data.session) {
//         router.push("/account");
//       }
//     }
//     getSession();
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//       {/* Hero Section */}
//       <motion.h1
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="text-5xl font-bold mb-4"
//       >
//         ¡Bienvenido a IoTColimex! 🌱
//       </motion.h1>

//       <motion.p
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 1, delay: 0.3 }}
//         className="text-lg mb-6 max-w-xl text-center"
//       >
//         Un sistema avanzado de monitoreo y alerta para cultivos de limón 🍋,
//         basado en IoT y análisis de datos en tiempo real.
//       </motion.p>

//       {/* Botón para iniciar sesión */}
//       <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-200 transition"
//         onClick={() => router.push("/login")}
//       >
//         Iniciar sesión 🚀
//       </motion.button>

//       {/* Sección Informativa */}
//       <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//         <motion.div
//           className="p-6 bg-white text-gray-800 rounded-lg shadow-lg"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           <h2 className="text-xl font-bold">📊 Análisis en Tiempo Real</h2>
//           <p className="mt-2">
//             Obtén datos precisos sobre la temperatura, humedad y condiciones del
//             suelo.
//           </p>
//         </motion.div>

// //         <motion.div
//           className="p-6 bg-white text-gray-800 rounded-lg shadow-lg"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//         >
//           <h2 className="text-xl font-bold">⚡ Notificaciones Inteligentes</h2>
//           <p className="mt-2">
//             Recibe alertas en tiempo real cuando haya cambios críticos en el
//             ambiente.
//           </p>
//         </motion.div>

//         <motion.div
//           className="p-6 bg-white text-gray-800 rounded-lg shadow-lg"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//         >
//           <h2 className="text-xl font-bold">🌍 Optimización de Recursos</h2>
//           <p className="mt-2">
//             Reduce el consumo de agua y fertilizantes con datos precisos y
//             control automatizado.
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import { Fragment, useEffect, useState } from "react";
// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
// import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
// import { useRouter } from "next/router";

// const Home = () => {
//   const session = useSession();
//   const supabase = useSupabaseClient();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false); // Indicador de carga
//   const [errorMessage, setErrorMessage] = useState<string | null>(null); // Para mostrar mensajes de error

//   useEffect(() => {
//     if (session) {
//       setLoading(true); // Mostrar el spinner mientras redirige
//       router.push("/Account"); // Redirige al dashboard si hay sesión
//     }
//   }, [session, router]);

//   return (
//     <>
//       {!session && !loading && (
//         <div
//           style={{
//             margin: "100px auto",
//             padding: "20px",
//             maxWidth: "400px",
//             width: "90%",
//             border: "3px solid black",
//             borderRadius: "10px",
//             backgroundColor: "#1A202C",
//             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
//           }}
//         >
//           <center>
//             <h1 style={{ color: "#E2E8F0", fontSize: "24px", marginBottom: "20px" }}>
//               Inicio de sesión
//             </h1>
//           </center>
//           <Auth
//             supabaseClient={supabase}
//             appearance={{
//               theme: ThemeSupa,
//               style: {
//                 button: {
//                   backgroundColor: "#3182CE",
//                   color: "#FFFFFF",
//                   fontWeight: "bold",
//                   borderRadius: "5px",
//                 },
//                 input: {
//                   border: "1px solid #A0AEC0",
//                   borderRadius: "5px",
//                   backgroundColor: "#EDF2F7",
//                 },
//                 container: {
//                   backgroundColor: "#2D3748",
//                   padding: "20px",
//                   borderRadius: "10px",
//                 },
//               },
//             }}
//             providers={[]}
//             theme="dark"
//           />
//           {errorMessage && (
//             <div
//               style={{
//                 color: "red",
//                 marginTop: "10px",
//                 textAlign: "center",
//                 fontSize: "14px",
//               }}
//             >
//               {errorMessage}
//             </div>
//           )}
//         </div>
//       )}

//       {loading && (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100vh",
//           }}
//         >
//           <div className="loader"></div> {/* Spinner */}
//         </div>
//       )}
//     </>
//   );
// };
// export default Home;
