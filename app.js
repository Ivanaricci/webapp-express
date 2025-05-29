// importo express
const express = require('express');

// inizializzo la variabile app con il metodo express
const app = express();

// definisco il numero di porta su cui il server deve rimanere in ascolto
const port = process.env.SERVER_PORT || 3000;

// uso il middleware per gli asset statici
app.use(express.static('public'));

// uso il middlware per il parsing del body delle richieste
app.use(express.json());

// definisco l'entry point
app.get("/", (req, res) => {
    res.send('Movies API server')
});

// 
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})