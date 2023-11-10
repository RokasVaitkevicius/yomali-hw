import React, { useState, useEffect } from "react"
import moment from "moment"
import "./App.css"

function App() {
  const [visits, setVisits] = useState([])
  const [aggregation, setAggregation] = useState("minute")
  const [org, setOrg] = useState("2agp59nwu8nrszm4p6kfriekoeo0s1")
  const [dateFrom, setDateFrom] = useState(
    moment().subtract(24, "hours").format("YYYY-MM-DDTHH:mm")
  )
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DDTHH:mm"))

  useEffect(() => {
    fetch(
      `http://localhost:8080/visits?aggregation=${aggregation}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": org,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setVisits(data.data))
      .catch((error) => console.error("Error fetching visits:", error))
  }, [aggregation, org, dateFrom, dateTo])

  return (
    <div className="App">
      <header className="App-header">
        <h2>Visits</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <label>
            Org:
            <select value={org} onChange={(e) => setOrg(e.target.value)}>
              <option value="2agp59nwu8nrszm4p6kfriekoeo0s1">Org 1</option>
              <option value="api-key-tenant-b">Org 2</option>
            </select>
          </label>

          <label>
            Aggregation:
            <select
              value={aggregation}
              onChange={(e) => setAggregation(e.target.value)}
            >
              <option value="minute">Minute</option>
              <option value="hour">Hour</option>
              <option value="day">Day</option>
              <option value="month">Month</option>
            </select>
          </label>

          <label>
            Date From:
            <input
              type="datetime-local"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </label>

          <label>
            Date To:
            <input
              type="datetime-local"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </label>
        </div>

        {Object.keys(visits).map((visit, index) => (
          <div key={index} style={{ marginBottom: "30px" }}>
            <h4
              style={{
                padding: "10px",
                marginBottom: "15px",
              }}
            >
              Page URL: {visit}
            </h4>
            <table
              style={{
                width: "100%",
                marginBottom: "15px",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Visits Count
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Timeframe
                  </th>
                </tr>
              </thead>
              <tbody>
                {visits[visit].map((v, idx) => (
                  <tr key={idx}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {v.visit_count}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {v.timeframe}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </header>
    </div>
  )
}

export default App
