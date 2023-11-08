;(function () {
  const endpoint = "http://localhost:8080/visits"
  const localStorageKey = "user_identifier"

  // Function to generate a unique identifier
  function generateIdentifier() {
    return "uid_" + Math.random().toString(36).substr(2, 9)
  }

  // Get or create the user identifier
  let userIdentifier = localStorage.getItem(localStorageKey)
  if (!userIdentifier) {
    userId = generateIdentifier()
    localStorage.setItem(localStorageKey, userIdentifier)
  }

  // Function to send the visit information to the server
  function logVisit(pageUrl) {
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: userIdentifier,
        pageUrl: pageUrl,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Visit logged:", data))
      .catch((error) => console.error("Error logging visit:", error))
  }

  // Log the current page visit
  logVisit(window.location.href)
})()
