const setImagePath = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}/img/movies_cover/`);
    req.imagePath = `${req.protocol}://${req.get('host')}/img/movies_cover/`
    next()
}

module.exports = setImagePath