console.log("NEW SERVER FILE LOADED");

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: "fatins_florette"
});

db.connect((err) => {
    if (err) {
        console.error("Connection Failed:", err);
    } else {
        console.log("Database Connected Successfully");
    }
});

app.get("/", (req, res) => {
    res.send("Server is Working!");
});

app.get("/products", (req, res) => {
    
    const sql = "SELECT * FROM product";

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });

});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});