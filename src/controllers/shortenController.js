const shortid = require('shortid');
const URL = require('../models/URL');
const { detectOS, detectDevice } = require('../utils/analytics');

exports.createShortUrl = async (req, res) => {
    const { longUrl, customAlias, topic } = req.body;
    const userId = req.user.id;

    if (!longUrl) {
        return res.status(400).json({ error: 'longUrl is required' });
    }

    const shortCode = customAlias || shortid.generate();

    const existingUrl = await URL.findOne({ shortCode });
    if (existingUrl) {
        return res.status(400).json({ error: 'Custom alias already exists' });
    }

    const url = new URL({ userId, longUrl, shortCode, topic });
    await url.save();

    res.status(201).json({
        shortUrl: `${process.env.BASE_URL}/${shortCode}`,
        createdAt: url.createdAt,
    });
};

exports.redirectToUrl = async (req, res) => {
    const { shortCode } = req.params;
    const url = await URL.findOne({ shortCode });

    if (!url) {
        return res.status(404).json({ error: 'URL not found' });
    }

    url.clicks.push({
        timestamp: new Date(),
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        osType: detectOS(req.headers['user-agent']),
        deviceType: detectDevice(req.headers['user-agent'])
    });
    await url.save();

    res.redirect(url.longUrl);
};

// Get analytics for a specific short URL
exports.getUrlAnalytics = async (req, res) => {
    const { shortCode } = req.params;
    const url = await URL.findOne({ shortCode });

    if (!url) {
        return res.status(404).json({ error: 'URL not found' });
    }

    const totalClicks = url.clicks.length;
    const osType = getAnalytics(url.clicks, 'osType');
    const deviceType = getAnalytics(url.clicks, 'deviceType');

    res.json({ totalClicks, osType, deviceType });
};

// Helper function to calculate analytics
function getAnalytics(clicks, key) {
    return clicks.reduce((acc, click) => {
        acc[click[key]] = (acc[click[key]] || 0) + 1;
        return acc;
    }, {});
}
