const { Router } = require('express');
const router = Router();

const { register_post, login_post, logout_get, me_get } = require('../controllers/authController');
const { login, register } = require('../middleware/validation');

router.post('/register', register, register_post);
router.post('/login', login, login_post);
router.get('/logout', logout_get);
router.get('/me', me_get);


module.exports = router;

