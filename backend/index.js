const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('./.env')
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
// const { Query } = require('mysql2/typings/mysql/lib/protocol/sequences/Query');

const PORT = process.env.PORT;
const app = express();

//middleware
app.use(cors());
app.use(express.json())

const sqlFilePath = '../project_data_304.sql';

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DBNAME,  
})

// fs.readFile(sqlFilePath, 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading SQL file:', err);
//     return;
//   }

//   const queries = data.split(';');

//   db.connect((err) => {
//     if (err) {
//       console.error('Error connecting to the database:', err);
//       return;
//     }

//     queries.forEach((query) => {
//       db.query(query, (err, result) => {
//         if (err) {
//           console.error('Error executing query:', err, query);
//         } else {
//           console.log('Query executed successfully:', result);
//         }
//       });
//     });

//     db.end();
//   });
// });

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



app.post('/check-poster-id', (req, res) => {
  const selectedButton = req.body.selectedButton;
  const ID = req.body.ID;

  let search_table = "";
  if (selectedButton === "PrivateLister") {
    search_table = "PrivateLister";
  }
  if (selectedButton === "HotelAffiliate") {
    search_table = "HotelOrganization";
  }

  if (search_table) {
    const query = `SELECT * FROM ${search_table} WHERE ID = ?`
    db.query(query, [ID], (err, results) => {
      if (err) {
        console.error('Error checking ID:', err);
        return res.status(500).json({ error: 'Error checking ID' });
      }
  
      const isIDFound = results.length > 0;
      return res.json({ found: isIDFound });
    });
  }
  return false;

});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
