const router = require('express').Router();
const { Post, Category, User, Tag } = require('../../models');

router.get('/', async (req, res) => {
    // or direct to page with all posts
    try {
        // Get all projects and JOIN with user data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('blog', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/post/:id', async (req, res) => {
    try {

        const parsedId = parseInt(req.params.id);
        // get the correct post by id
        const postData = await Post.findByPk(parsedId);
        const stringified = JSON.stringify(postData);
        const parsed = JSON.parse(stringified);
 

        const displayDeleteButton = () => {
            const currentUser = req.session.user_id;
            const postUser = postData.user_id;

     
            if (currentUser === postUser) {
                return true;
            }
            else {
                return false;
            }
        }

        res.render('post', {
            displayDeleteButton,
            // pass in user object
            post: parsed,
            logged_in: req.session.logged_in
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;