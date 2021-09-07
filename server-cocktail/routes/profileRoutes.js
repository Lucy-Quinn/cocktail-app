const { Router } = require('express');
const router = Router();
const { requireAuth } = require('../middleware/authMiddleware');
const {
  profile_get_profile,
  profile_put_profile,
  profile_delete_profile,
} = require('../controllers/profileController');

router.get('/:profileId', profile_get_profile);
router.put('/:profileId', requireAuth, profile_put_profile);
router.delete('/:profileId', requireAuth, profile_delete_profile);

module.exports = router;
