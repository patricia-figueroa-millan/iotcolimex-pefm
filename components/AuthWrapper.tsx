import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState, ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const session = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session !== undefined) {
      setLoading(false);
    }
  }, [session]);

  if (loading) return <p>Cargando...</p>;

  return <>{children}</>;
};

export default AuthWrapper;
