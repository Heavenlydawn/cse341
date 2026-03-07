module.exports = {
    // If authenticated, go to the next page. Else redirect to homepage
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.redirect("/")
        }
    },
    // If authenticated, always redirect to the dashboard. Else go to the next page
    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect("/dashboard")
        } else {
            return next() 
        }
    }

}