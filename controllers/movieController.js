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

        // se non trovo il film mostro errore 404
        if (movieResult.length === 0 || movieResult[0].id === null) {
            return res.status(404).json({ error: "Not found" })
        }

        const movie = movieResult[0];

        // eseguo la query per il recupero delle recensioni
        connection.query(reviewsSql, [id], (err, reviewsResult) => {
            if (err) return res.status(500).json({ error: "Database query failed" + err });

            // aggiungo le recensioni
            movie.reviews = reviewsResult;

            res.json(movieResult);
        })


    })


}

module.exports = {
    index,
    show
}