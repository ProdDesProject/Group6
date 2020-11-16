var express = require('express');
const { post } = require('../app');
var router = express.Router();

const User = require('../models/user_model')

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.query()
      .then(users => {
        res.json(users)
      })
});



router.get('/:id', (req, res) => {
  User.query()
      .findById(req.params.id)
      .then(users => {
        res.json(users)
      })
  console.log(req.params.id);

});

router.post('/add', async (req, res) => {
  const graph = req.body;
  let insertedGraph = await User
      .query()
      .insertGraph((graph)
      );
      res.send(insertedGraph);
});

router.get('/delete/:id', async function (req,res){
  const numDeleted = await User.query()
      .deleteById(req.params.id);
      res.redirect('/users/')
 

});


module.exports = router;
