import { Fragment, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <Fragment>
      {!session ? (
        <div
          style={{
            margin: "100px auto auto auto",
            padding: "10px 5px 0 5px",
            width: "50%",
            border: "3px solid black",
          }}
        >
          <center>
            <label style={{ color: "GrayText" }}>INICIO DE SESIÓN</label>
          </center>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            theme="dark"
          />{" "}
        </div>
      ) : (
        <Account session={session} />
      )}
    </Fragment>
  );
};

export default Home;
