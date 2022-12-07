const router = require('express').Router();
// const User = require('../models/User');

router.get('/', (req, res) => {
    res.json({
        error: null,
        data: {
            title: 'mi ruta protegida',
            user: req.user
        }
    })
})



module.exports = router