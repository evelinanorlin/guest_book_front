var express = require('express');
var router = express.Router();
const BlogModel = require('../models/blogs-model')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const blogs = await BlogModel.find();
  res.status(200).json(blogs);
});

router.post('/', async (req, res) => {
  const blog = await BlogModel.create(req.body);
  res.status(201).json(blog)
})

module.exports = router;