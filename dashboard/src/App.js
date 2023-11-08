import React, { useState, useEffect } from "react"
import logo from "./logo.svg"
import "./App.css"

function App() {
  const [visits, setVisits] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/visits")
      .then((response) => response.json())
      .then((data) => setVisits(data.visits))
      .catch((error) => console.error("Error fetching visits:", error))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h2>Visits</h2>
        <ul>
          {visits.map((visit) => (
            <li key={visit.id}>
              <p>
                <strong>Page URL:</strong> {visit.pageUrl}
              </p>
              <p>
                <strong>Visited at:</strong> {visit.createdAt}
              </p>
            </li>
          ))}
        </ul>
      </header>
    </div>
  )
}

export default App
