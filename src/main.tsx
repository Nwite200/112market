import React from "react"
import "./styles/globals.css"
import { createRoot } from "react-dom/client"
import App from "./App"

const container = document.getElementById("root")

if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
