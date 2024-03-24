import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

import { BrowserRouter as Router } from "react-router-dom"
import { Web3Provider } from "./components/Web3Provider.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Web3Provider>
        <App />
      </Web3Provider>
    </Router>
  </React.StrictMode>,
)
