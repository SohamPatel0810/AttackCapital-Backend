module.exports = app => {
    app.get('/', (req, res) => {
        res.send("Welcome to Blog Backend");
    })

    app.use("/authentication", require('./authentication'));
}