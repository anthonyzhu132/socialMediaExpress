const express = require('express')
const app = express()
const port = 8080

// Rendering Root Page
app.get("/", (req, res) => {
  res.send("Hello from the root page");
});

//Listening to Port 8080
app.listen(port, () => {
  console.log(`Listening to port ${port}`)
});