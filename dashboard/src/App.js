import React, { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [visits, setVisits] = useState([])
  const [aggregation, setAggregation] = useState("minute")

  useEffect(() => {
    fetch(`http://localhost:8080/visits?aggregation=${aggregation}`)
      .then((response) => response.json())
      .then((data) => setVisits(data.data))
      .catch((error) => console.error("Error fetching visits:", error))
  }, [aggregation])

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
        <select
          value={aggregation}
          onChange={(e) => setAggregation(e.target.value)}
        >
          <option value="minute">Minute</option>
          <option value="hour">Hour</option>
          <option value="day">Day</option>
          <option value="month">Month</option>
        </select>

        <table>
          <thead>
            <tr>
              <th>Page url</th>
              <th>Visits count</th>
              <th>Aggregation</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit) => (
              <tr key={visit.id}>
                <td>{visit.page_url}</td>
                <td>{visit.visit_count}</td>
                <td>{visit.aggregation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  )
}

export default App
