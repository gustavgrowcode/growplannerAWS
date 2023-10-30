const express = require("express");
const pg = require("pg")

const multer = require('multer');

const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Scheduler backend service." });
});
require("./routes/scheduler.routes")(app);

app.post('/upload-csv', upload.single('csvData'), (req, res) => {
  console.log('We are in backend');
  const csvData = req.file.buffer.toString('utf-8');

  // Parse csvData if needed

  const client = new pg.Client(dbConfig);
  client.connect();

  console.log('We are in backend');
  // Insert the data into the PostgreSQL database
  // You can use the pg library or an ORM like Sequelize or Knex

  client.end();

  res.status(200).json({ message: 'CSV data inserted into the database' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models");
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

