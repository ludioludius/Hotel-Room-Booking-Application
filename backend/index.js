const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('./.env')

const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(cors());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
})


//get all listings
app.get('/api/listings', (req, res) => {
  //temporary query until sql file to insert data into the DB is created
  db.query('SELECT * from authors', (err, results, fields) => {
    if (err) {
      return res.send(err)
    }
    console.log(fields)
    return res.json(results)
  })
})





app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});