"use client";

import { logoutUser } from "@/src/lib/actions/auth";

export default function Home() {
  return (
    <div>
      <h1>TRD Caribe Shop</h1>
      <button onClick={async () => await logoutUser()}>
        Cerrar Sesión
      </button>
    </div>
  );
}
