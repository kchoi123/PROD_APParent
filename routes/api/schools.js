const router = require("express").Router();
const schoolsController = require("../../controllers/schoolscontroller.js");

// displaying all the schools
router.route("/")
    .get(schoolsController.findAll);

// displaying all the schools for the state 
router.route("/state/:state")
    .get(schoolsController.findAllByState);

// create a new school 
router.route("/new")
	.post(schoolsController.create);

module.exports = router;