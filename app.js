const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(express.json());
app.get("/", (req, res) => {
    res.send('Movies API server')
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})