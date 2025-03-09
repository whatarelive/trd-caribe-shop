"use client"

import { logoutUser } from "@/src/lib/actions/auth"

export const Logoutbutton = () => {
  return (
    <button className="button-primary" onClick={async() => await logoutUser()}>Logoutbutton</button>
  )
}
