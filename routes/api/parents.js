const router = require("express").Router();
const parentsController = require("../../controllers/parentscontroller.js");

const passport = require("passport"); 

// displaying all the parents
router.route("/")
	.get(parentsController.findAllParents);

// displaying all the parents - for the filter criteria [State]
router.route("/state/:state")
	.get(parentsController.findAllParentsForAState);

// get the info of the parents already in the database - to check username at sign-up
router.route("/all")
	.get(parentsController.findAllParentsInDB);

// displaying only one parent
router.route("/:id")
	.get(parentsController.findOne);

// Updating  only one parent profile
router.route("/update")
	.post(parentsController.update);

router.route("/checkstatus").get(parentsController.checkStatus);

function passportAuthenticate(localStrategy, req, res, next) {
	// console.log(localStrategy, req.body, next)
	passport.authenticate(localStrategy, function (err, user, info) {
		if (err) {
			// console.log("passport login/signup err", err)
			return next(err);
		}
		if (!user) {
			// console.log("************", err, user, info)
			if (info.from === "signup") {
				return res.redirect("/")
			}
			else if (info.from === "login") {
				return res.json({status:"unsuccessful"})
			}
		} else {
			// console.log("passed ++++++++++++++++")
			req.login(user, function (err) {
				if (err) {
					console.log(err)
					return next(err);
				} else {
					console.log("\n##########################");
					console.log(req.isAuthenticated());
					console.log('sucess');
					console.log(req.session.passport.user.dataValues.id);
					console.log("##########################");
					console.log("\n")
					return res.json({status:"success"});
				}

			});
		}

	})(req, res, next);
};


router.route("/signup").post(function (req, res, next) {
	console.log("Req", req.body)
	passportAuthenticate("local-signup", req, res, next);
});

router.route("/login").post(function (req, res, next) {
	console.log("Req", req.body)
	passportAuthenticate("local-signin", req, res, next);
});



module.exports = router;