const { Router } = require('express');
const router = Router();
const { requireAuth } = require('../middleware/authMiddleware');
const fileUploader = require('./../config/cloudinary');
const {
  cocktail_get,
  cocktail_post,
  cocktail_get_cocktail,
  cocktail_put,
  cocktail_delete,
  cocktail_upload_image,
  popular_cocktails_get,
  cocktails_by_name_post,
} = require('../controllers/cocktailController');

router.get('/popular-cocktails', requireAuth, popular_cocktails_get);
router.post('/cocktails-by-name', requireAuth, cocktails_by_name_post);
router.post(
  '/upload-image',
  fileUploader.single('image'),
  cocktail_upload_image,
);
router.get('/your-cocktails', requireAuth, cocktail_get);
router.post('/create-cocktail', requireAuth, cocktail_post);
router.get('/:cocktailId', requireAuth, cocktail_get_cocktail);
router.put('/:cocktailId', requireAuth, cocktail_put);
router.delete('/:cocktailId', requireAuth, cocktail_delete);

module.exports = router;
