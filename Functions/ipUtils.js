// ipUtils.js
const getIpAddress = (req) => {
    // Get the IP address from headers or socket
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    // Normalize IPv6 loopback address to IPv4 loopback address for consistency
    return (ipAddress === '::1') ? '127.0.0.1' : ipAddress;
};

module.exports = getIpAddress;
