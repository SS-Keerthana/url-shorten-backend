const express = require('express');
const { authenticateJWT } = require('../middlewares/auth');
const rateLimit = require('express-rate-limit');
const {
    createShortUrl,
    redirectToUrl,
    getUrlAnalytics
} = require('../controllers/shortenController');

const router = express.Router();

const createUrlLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10 // limit each IP to 10 requests per windowMs
});


// Route to create a short URL
router.post('/', authenticateJWT, createUrlLimiter, createShortUrl);

// Route to redirect to the original URL
router.get('/:shortCode', redirectToUrl);

// Route to get analytics for a specific short URL
router.get('/analytics/:shortCode', authenticateJWT, getUrlAnalytics);

module.exports = router;

