const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// Routes
app.use("/auth", require("./routes/jwtAuth.js"));
app.use("/dashboard", require("./routes/dashboard.js"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
