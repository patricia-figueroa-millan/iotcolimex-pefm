import React, { createContext, useContext, useState, ReactNode } from "react";

export type Alert = {
    id: number;
    device_id: string;
    alert_id: string;
    alert_type: number;
    description: string;
    created_at: string;
  };
  

type AlertsContextType = {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  removeAlert: (id: number) => void;
  autoNotify: boolean; // Estado de notificaciones automáticas
  toggleAutoNotify: () => void; // Método para activar/desactivar
};

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

export const AlertsProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [autoNotify, setAutoNotify] = useState(false); // Estado de notificaciones automáticas

  const addAlert = (alert: Alert) => {
    setAlerts((prev) => [...prev, alert]);
  };

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const toggleAutoNotify = () => {
    setAutoNotify((prev) => !prev);
  };

  return (
    <AlertsContext.Provider
      value={{ alerts, addAlert, removeAlert, autoNotify, toggleAutoNotify }}
    >
      {children}
    </AlertsContext.Provider>
  );
};

export const useAlerts = (): AlertsContextType => {
  const context = useContext(AlertsContext);
  if (!context) {
    throw new Error("useAlerts must be used within an AlertsProvider");
  }
  return context;
};
