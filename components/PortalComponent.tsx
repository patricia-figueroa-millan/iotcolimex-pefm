import ReactDOM from "react-dom";
import React, { ReactNode } from "react";

type PortalProps = {
  children: ReactNode;
};

export default function PortalComponent({ children }: PortalProps) {
  const portalRoot = document.getElementById("notification-portal");
  if (!portalRoot) {
    console.error("No se encontró el elemento con id 'portal-root'.");
    return null;
  }
  return ReactDOM.createPortal(children, portalRoot);
}