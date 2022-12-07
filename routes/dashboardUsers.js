const router = require('express').Router();
const User = require('../models/User');


router.get('/', async (req, res) => {
  let users = await User.find()
  if (users) res.json({ error: null, data: users })
  else {
    res.json({
      error: null,
      title: 'error en traer los users'
    })
  }

})
router.put('/', async (req, res) => {
  let nameQuery = req.body.name
  let idQuery = req.body._id

  if (!nameQuery) res.json('Ingrese un nombre')
  if (!idQuery) res.json('Ingrese un id')
  // console.log(idQuery,"soyquery")

  let allUsers = await User.find()
  let mapusers = allUsers.find(e => e._id.valueOf() === idQuery)
  if(!mapusers) res.json({title:"no se encotro id"})
  if(mapusers){
   let modificated =  await User.findByIdAndUpdate(idQuery,{name:nameQuery})
   
   res.status(200).send(modificated)
  }




})

module.exports = router