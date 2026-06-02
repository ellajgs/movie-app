require('dotenv').config();
const fs = require('fs');
const db = require('./connect');

const sql = fs.readFileSync("./server/database/setup.sql").toString();

db.query(sql)
    .then(() => {
        // Closes database connection
        db.end();
        console.log("Setup complete");
    })
    .catch(error => {
        console.log(error);
    });