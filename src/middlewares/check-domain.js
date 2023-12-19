const checkDomainMiddleware = (req, reply, done) => {
    const allowedDomains = ['amarkets', '127.0.0.1'];

    const host = req.headers.host;
    if (host && allowedDomains.some(domain => host.includes(domain))) {
        return done();
    }

    reply.code(403).send('Access Forbidden');
};

module.exports = checkDomainMiddleware;
