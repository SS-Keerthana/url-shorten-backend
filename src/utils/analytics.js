// utils/analytics.js
exports.detectOS = (userAgent) => {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
    if (userAgent.includes('Android')) return 'Android';
    return 'Other';
};

exports.detectDevice = (userAgent) => {
    if (userAgent.includes('Mobile') || userAgent.includes('iPhone') || userAgent.includes('Android')) return 'mobile';
    return 'desktop';
};
