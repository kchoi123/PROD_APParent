var path = require("path");
var router = require("express").Router();
var apiRoutes = require("./api");
var controller = require(".././controllers")


router.route("/logout").get(function (req, res) {
       
    res.clearCookie("user_sid");
    req.session.destroy(function(err) {
        req.logout();
        res.clearCookie("user_sid");
        res.status(200).redirect("/");
    });

});

// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
// router.use(function (req, res) {
//     res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;