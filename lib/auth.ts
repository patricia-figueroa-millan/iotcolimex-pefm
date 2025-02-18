import { NextRequest } from 'next/server'

export function isAuthenticated(request: NextRequest): boolean {
    const cookieHeader = request.headers.get('cookie') || "";
    const cookies = Object.fromEntries(
        cookieHeader.split("; ").map((c) => c.split("=")) // Convertir el string de cookies a un objeto
    );

    console.log("Cookies disponibles: ", cookies);
    return cookies["auth-token"] !== undefined; // Verificar si la cookie de autenticación existe en la petición actual 
  }