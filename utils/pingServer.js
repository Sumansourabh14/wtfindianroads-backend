const axios = require("axios");

// Function to ping the server
const pingServer = () => {
  axios
    .get(process.env.LIVE_BACKEND_URL)
    .then((response) => {
      console.log("Server pinged successfully:", response.status);
    })
    .catch((error) => {
      console.error("Error pinging the server:", error.message);
    });
};

module.exports = { pingServer };
