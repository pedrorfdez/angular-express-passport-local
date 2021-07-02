module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        else
            return res.status(400).json({'statusCode': 400, 'message': 'not authenticated'});
    },
    
    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated())
            return next();
        else
            return res.status(400).json({'statusCode': 400, 'message': 'already logged in'});
    },
}