const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos
const uri = `mongodb+srv://apiJWT:${process.env.PASSWORD}@cluster0.gfac6fk.mongodb.net/?retryWrites=true&w=majority`;
const option = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(uri, option)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log('error db:', e))



// import routes
const authRouter = require('./routes/auth')
const dashboadRoutes = require('./routes/dashboard');
const verifyToken = require('./routes/validate-token');
const dashboadUsers = require('./routes/dashboardUsers')



// route middlewares
app.use('/api/user', authRouter)
app.use('/api/dashboard', verifyToken, dashboadRoutes);
app.use('/api/dashboardUsers', verifyToken, dashboadUsers);

app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})