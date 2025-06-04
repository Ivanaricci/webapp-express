const connection = require('../data/db');

// metodo index
const index = (req, res) => {
    connection.query("SELECT * FROM movies", (err, movieResult) => {
        if (err) return res.status(500).json({ error: "Database query failed" + err });


        // ciclo l'array per sovrascrivere il valore della proprietà image. in questo modo non conterrà più solo il nome dell'immagine ma tutto il percorso
        const movies = movieResult.map((movie) => {
            console.log(req, movie.image)
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })

        res.json(movies)
    })
}

const show = (req, res) => {
    // recupero l'id
    const { id } = req.params

    // query per il recupero dei film avente l'id recuperato
    const movieSql = `
    SELECT B. *, ROUND(AVG(R.vote)) AS average_vote
    FROM movies B
    JOIN reviews R ON r.movie_id = B.id 
    WHERE B.id= ?`;

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

            // vado ad aggiungere la media delle recensioni per il singolo libro
            movie.average_vote = parseInt(movie.average_vote);


            res.json({ ...movie, image: req.imagePath + movie.image });
        })


    })


}

module.exports = {
    index,
    show
}