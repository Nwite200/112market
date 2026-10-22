import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function DefaultLayout() {
  return (
    <html lang="en">
      <body className="bg-background text-text">
        <Navbar />
        <main className="py-6">
          <Outlet />
        </main>
        <Footer />
      </body>
    </html>
  )
}

export { DefaultLayout }
