const { Router } = require('express');
const router = Router();
const { requireAuth } = require('../middleware/authMiddleware');

const { cocktail_get, cocktail_post, cocktai_get_cocktail, cocktail_put, cocktail_delete } = require('../controllers/cocktailController');

router.get('/', requireAuth, cocktail_get);
router.post('/create-cocktail', requireAuth, cocktail_post);
router.get('/:cocktailId', requireAuth, cocktai_get_cocktail);
router.put('/:cocktailId', requireAuth, cocktail_put);
router.delete('/:cocktailId', requireAuth, cocktail_delete);

module.exports = router;