const { Router } = require('express');
const router = Router();

const { register_post, login_post, logout_get } = require('../controllers/authController');

router.post('/register', register_post);
router.post('/login', login_post);
router.get('/logout', logout_get);

module.exports = router;

