const db = require("../models")

module.exports = {
    //create a post
    create: function (req, res) {
        if (req.isAuthenticated()) {
            db.posts.create({
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                //double check to see if req.session.passport.user.id is what we need
                parentId: req.session.passport.user.id,
                imageUrl: req.body.imageUrl
            }).then(function (result) {
                res.end()
                // res.json(result)
            })
        }
    },
    //find a specific post 
    findOne: function (req, res) {
        if (req.isAuthenticated()) {
            db.posts.findOne({ where: { id: req.params.id } }).then(function (result) {
                res.json(result)
            })
        }
    },
    //find all post from a parent
    findAllFromParent: function (req, res) {
        if (req.isAuthenticated()) {
            db.posts.findAll({ where: { parentId: req.params.parentId } }).then(function (result) {
                res.json(result)
            })
        }
    },
    //find all post ever made
    findAllPosts: function (req, res) {
        if (req.isAuthenticated()) {
            db.posts.findAll(
                {
                    order: [['updatedAt', 'DESC']],
                    include: [
                        {
                            attributes: ["id", "userName", "photoLink"],
                            model: db.parents,
                            as: "parent"
                        }
                    ]
                }
            ).then(function (result) {
                res.json(result)
                console.log("This is the result", result)
            })
        }
    }
}