const connection = require('../data/db');

// metodo index
const index = (req, res) => {
    connection.query("SELECT * FROM movies", (err, movieResult) => {
        if (err) return res.status(500).json({ error: "Database query failed" + err });
        res.json(movieResult)
    })
}

const show = (req, res) => {
    // recupero l'id
    const { id } = req.params

    // query per il recupero dei film avente l'id recuperato
    const movieSql = "SELECT * FROM movies WHERE id= ?";

    // query per il recupero delle recensioni del film recuperato
    const reviewsSql = `
    SELECT *
    FROM reviews
    WHERE movie_id = ?
    `

    // eseguo la query per recuperare il film
    connection.query(movieSql, [id], (err, movieResult) => {
        if (err) return res.status(500).json({ error: "Database query failed" + err });

        res.json(movieResult);
    })


}

module.exports = {
    index,
    show
}