const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares');

router.get('/health', async (req, res, next) => {
  return res.sendResponse({ message: 'All Good' });
});

// authorizing requests sent from client
router.all('/external',  middlewares.authorized, require('../controllers/external'));

// authorizing requests sent from internal dashboard
router.all('/dashboard',  middlewares.authorized, require('../controllers/dashboard'));

// internal inter-service calls
router.all('/internal', require('../controllers/internal'));

module.exports = router;