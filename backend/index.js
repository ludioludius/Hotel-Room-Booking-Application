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
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
})



app.get('/api/PrivateListing', (req, res) => {
  let query = 'SELECT Cost, Description, NumPeople, NumBeds, Name \
               FROM PrivateListing pl, RentableUnit ru, PrivateLister l \
               WHERE pl.RentableUnit_ID = ru.RentableUnit_ID AND ru.PrivateOrganization_ID = l.ID'
  console.log(query)
  db.query(query, (err, results, fields) => {
    if (err) {
      return res.send(err)
    }
    console.log(fields)
    return res.json(results)
  })
})


app.get('/api/HotelListing', (req, res) => {

  let query = 'SELECT Cost, Description, NumPeople, NumBeds, Name, NumRooms \
               FROM HotelListing hl, BookableUnit bu, Property p \
               WHERE hl.Property_ID = bu.Property_ID AND hl.RoomNumber = bu.RoomNum AND bu.Property_ID = p.Property_ID'
  console.log(query)

  db.query(query, (err, results, fields) => {
    if (err) {
      return res.send(err)
    }
    console.log(fields)
    return res.json(results)
  })
})



// (3) all details for a hotel/private listing but with selection parameters (cost, num people, type) for selction feature





app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});