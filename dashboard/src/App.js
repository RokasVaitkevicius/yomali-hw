import React, { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [visits, setVisits] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/visits")
      .then((response) => response.json())
      .then((data) => setVisits(data.data))
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
                <strong>Page url:</strong> {visit.page_url}
              </p>
              <p>
                <strong>Visit count</strong> {visit.visit_count}
              </p>
              <p>
                <strong>Timeframe</strong> {visit.timeframe}
              </p>
            </li>
          ))}
        </ul>
      </header>
    </div>
  )
}

export default App
