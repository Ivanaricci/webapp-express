const connection = require('../data/db');

// metodo index
const index = (req, res) => {
    console.log('Elenco film')
}

const show = (req, res) => {
    console.log('Dettaglio flm')
}

module.exports = {
    index,
    show
}