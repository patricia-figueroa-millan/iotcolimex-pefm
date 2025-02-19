import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const supabase = createServerSupabaseClient({ req, res });

        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error || !data.session) {
            return res.status(401).json({ message: "Error de autenticación" });
        }

        // Supabase maneja automáticamente la cookie de sesión
        return res.status(200).json({ message: "Inicio de sesión exitoso" });
    }
}
