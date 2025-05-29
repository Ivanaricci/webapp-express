// importo msql2
const mysql = require('mysql2');

// creao la connessione al db
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// effettuo la connessione
connection.connect((err) => {
    if (err) {
        console.log("Error to connect to MySQL:" + err)
    }
    else {
        console.log("Connected to MySQL!")
    }
})

// esporto la variabile connection
module.exports = connection