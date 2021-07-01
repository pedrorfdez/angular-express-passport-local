module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next;
        else
            return res,status(400).json({'message': 'not authenticated'});
    },
    
    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated())
            return next;
        else
            return res.status(400).json({'message': 'already logged in'});
    }
}