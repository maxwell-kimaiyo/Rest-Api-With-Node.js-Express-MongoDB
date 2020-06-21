const router = require('express').Router();
const Posts = require('../models/post.model');

router.route('/').get((req, res) => {
  Posts.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add').post((req, res) => {

  const newPost = new Posts({
    title: req.body.title,
    descriptionL: req.body.description 

  }); 

  newPost.save()
  .then((data) => res.json(data))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Posts.findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Posts.findByIdAndDelete(req.params.id)
    .then(() => res.json('post deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Posts.findById(req.params.id)
    .then(data => {
      data.title = req.body.title;
      data.description = req.body.description;
     

      data.save()
        .then(() => res.json('post updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
}); 

module.exports = router;