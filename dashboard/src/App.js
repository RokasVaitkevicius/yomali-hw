import React, { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [visits, setVisits] = useState([])
  const [aggregation, setAggregation] = useState("minute")
  const [org, setOrg] = useState("2agp59nwu8nrszm4p6kfriekoeo0s1")

  useEffect(() => {
    fetch(`http://localhost:8080/visits?aggregation=${aggregation}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": org,
      },
    })
      .then((response) => response.json())
      .then((data) => setVisits(data.data))
      .catch((error) => console.error("Error fetching visits:", error))
  }, [aggregation, org])

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

        <select value={org} onChange={(e) => setOrg(e.target.value)}>
          <option value="2agp59nwu8nrszm4p6kfriekoeo0s1">Org 1</option>
          <option value="api-key-tenant-b">Org 2</option>
        </select>

        {Object.keys(visits).map((visit) => (
          <>
            <h4>{visit}</h4>
            <table>
              <thead>
                <tr>
                  <th>Visits count</th>
                  <th>Timeframe</th>
                </tr>
              </thead>
              <tbody>
                {visits[visit].map((v) => (
                  <tr key={v}>
                    <td>{v.visit_count}</td>
                    <td>{v.timeframe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ))}
      </header>
    </div>
  )
}

export default App
