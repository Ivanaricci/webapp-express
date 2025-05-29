const connection = require('../data/db');

// metodo index
const index = (req, res) => {
    connection.query("SELECT * FROM movies", (err, movieResult) => {
        if (err) return res.status(500).json({ error: "Database query failed" + err });
        res.json(movieResult)
    })
}

const show = (req, res) => {
    console.log('Dettaglio flm')
}

module.exports = {
    index,
    show
}