const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "",
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});