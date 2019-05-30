const db = require("../models")

module.exports = {
    findAll: function (req, res) {
        // if (req.isAuthenticated()) {
            db.schools.findAll()
                .then(function (result) {
                    res.json(result)
                })
        // }
    },
    findAllByState: function (req, res) {
        console.log("BY STATE SCHOOOL - ", req.params.state);
        // if (req.isAuthenticated()) {
            db.schools.findAll(
                {where: {state: req.params.state}}
            )
                .then(function (result) {
                    res.json(result)
                    console.log("Schools for the state", result  );
                })
        // }
    },
    create: function (req, res) {
        // if (req.isAuthenticated()) {
            db.schools.create({
                name: req.body.name,
                streetAddress: req.body.streetAddress,
                city: req.body.city,
                state: req.body.state,
                zipcode: req.body.zipcode
            }).then(function (result) {
                res.json(result)
            })
        // }
    }
}