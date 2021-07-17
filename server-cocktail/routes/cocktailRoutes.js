const { Router } = require('express');
const router = Router();
const { requireAuth } = require('../middleware/authMiddleware');

const { cocktail_get, cocktail_post, cocktail_put, cocktail_delete } = require('../controllers/cocktailController');

router.get('/', requireAuth, cocktail_get);
router.post('/', requireAuth, cocktail_post);
router.put('/:cocktailId', requireAuth, cocktail_put);
router.delete('/:cocktailId', requireAuth, cocktail_delete);

module.exports = router;