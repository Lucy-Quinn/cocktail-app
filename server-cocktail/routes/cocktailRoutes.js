const { Router } = require('express');
const router = Router();
const { requireAuth } = require('../middleware/authMiddleware');

const { cocktail_get, cocktail_post, cocktai_get_cocktail, cocktail_put, cocktail_delete } = require('../controllers/cocktailController');

router.get('/', cocktail_get);
router.post('/', cocktail_post);
router.get('/:cocktailId', cocktai_get_cocktail);
router.put('/:cocktailId', cocktail_put);
router.delete('/:cocktailId', cocktail_delete);

module.exports = router;