// importo msql2
const mysql = require('mysql2');

// creao la connessione al db
const connection = mysql.createConnection({
    host: "",
    port: "",
    user: "",
    password: "",
    database: ""
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