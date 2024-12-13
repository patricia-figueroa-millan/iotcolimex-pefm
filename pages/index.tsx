import { Fragment, useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Para mostrar mensajes de error

  useEffect(() => {
    if (session) {
      setLoading(true); // Mostrar el spinner mientras redirige
      router.push("/account"); // Redirige al dashboard si hay sesión
    }
  }, [session, router]);

  const handleAuthEvents = () => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          alert("Por favor, revisa tu correo electrónico para recuperar tu contraseña.");
        }
        if (event === "SIGNED_OUT") {
          setErrorMessage(null); // Limpiar errores al cerrar sesión
        }
        if (event === "SIGNED_IN") {
          setErrorMessage(null); // Limpiar errores al iniciar sesión correctamente
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe(); // Llama a unsubscribe correctamente
    };
  };


  useEffect(() => {
    handleAuthEvents();
  }, []);

  return (
    <>
      {!session && !loading && (
        <div
          style={{
            margin: "100px auto",
            padding: "20px",
            maxWidth: "400px",
            width: "90%",
            border: "3px solid black",
            borderRadius: "10px",
            backgroundColor: "#1A202C",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <center>
            <h1 style={{ color: "#E2E8F0", fontSize: "24px", marginBottom: "20px" }}>
              Inicio de Sesión
            </h1>
          </center>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: {
                  backgroundColor: "#3182CE",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  borderRadius: "5px",
                },
                input: {
                  border: "1px solid #A0AEC0",
                  borderRadius: "5px",
                  backgroundColor: "#EDF2F7",
                },
                container: {
                  backgroundColor: "#2D3748",
                  padding: "20px",
                  borderRadius: "10px",
                },
              },
            }}
            providers={[]}
            theme="dark"
          />
          {errorMessage && (
            <div
              style={{
                color: "red",
                marginTop: "10px",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {errorMessage}
            </div>
          )}
          <center style={{ marginTop: "10px" }}>
            <a
              href="/reset-password" // Reemplaza con la URL adecuada para recuperación de contraseña
              style={{
                color: "#63B3ED",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              ¿Olvidaste tu contraseña?
            </a>
          </center>
        </div>
      )}

      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div className="loader"></div> {/* Spinner */}
        </div>
      )}
    </>
  );
};

export default Home;





///////////////////////////////////////////////////// Sección antigua pero funcional


// import { Fragment, useEffect } from "react";
// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
// import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
// import Account from "../components/Account";

// const Home = () => {
//   const session = useSession();
//   const supabase = useSupabaseClient();

//   return (
//     <Fragment>
//       {!session ? (
//         <div
//           style={{
//             margin: "100px auto auto auto",
//             padding: "10px 5px 0 5px",
//             width: "50%",
//             border: "3px solid black",
//           }}
//         >
//           <center>
//             <label style={{ color: "GrayText" }}>INICIO DE SESIÓN</label>
//           </center>
//           <Auth
//             supabaseClient={supabase}
//             appearance={{ theme: ThemeSupa }}
//             providers={[]}
//             theme="dark"
//           />{" "}
//         </div>
//       ) : (
//         <Account session={session} />
//       )}
//     </Fragment>
//   );
// };

// export default Home;
