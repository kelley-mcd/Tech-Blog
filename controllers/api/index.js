const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const tagRoutes = require('./tagRoutes');

router.use('/users', userRoutes);

router.use('/posts', postRoutes);
router.use('/tags', tagRoutes)

module.exports = router;
