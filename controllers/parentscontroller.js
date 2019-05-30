// load the models 
const db = require("../models")

// using it to access the Sequelize in built operators to conditionally show data 
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    create: function (req, res, parentId) {
        db.parents.create({
            userName: req.body.userName,
            // parentId: parentId,
            password: req.body.password,
            email: req.body.email,
            city: req.body.city,
            state: req.body.state,
            photoLink: req.body.photoLink
        }).then(function (result) {
            res.json(result)
        })
    },

    // find a specific parent 
    findOne: function (req, res) {
        db.parents.findOne({
            where: { id: req.session.passport.user.id }
            // where:{id: req.param.id}
        }).then(function (result) {
            res.json(result)
        })
    },

    // find all parents - sauf the parent logged in
    findAllParents: function (req, res) {
        db.parents.findAll({
            attributes: ["id", "userName", "email", "city", "state", "photoLink"],
            where: {
                // excluded the logged-in parent
                [Op.not]: [{ id: req.session.passport.user.id }]
            }
        }).then(function (result) {
            res.json(result)
        })
            .catch(err => res.status(422).json(err));
    },
    // find all parents - except the parent logged in - filter by state 
    findAllParentsForAState: function (req, res) {
        console.log("2 - Filtering Members based on state", req.params.state);
        db.parents.findAll({
            attributes: ["id", "userName", "email", "city", "state", "photoLink"],
            where: {
                // excluded the logged-in parent
                 state: req.params.state ,
                 [Op.not]: [{ id: req.session.passport.user.id }]
            }
        }).then(function (result) {
            console.log("3 - Filtering Members based on state", result);
            res.json(result);
        })
            .catch(err => res.status(422).json(err));
    },
    
    // get all the parents already in the database - to check username at sign-up
    findAllParentsInDB: function(req, res) {
        db.parents.findAll({
            attributes: ["userName", "email"]
        }).then(function(results) { res.json(results)});
    },


    // find all posts for a specific parent
    // findAllPostsForAParent: function(req, res){
    //     db.parents.findOne({
    //         where:{
    //             id: req.params.id
    //         }, 
    //         // include all posts for the specific parent 
    //         include: [{
    //             model: db.posts, as: "posts"
    //         }],
    //     }).then(function(result){
    //         res.json(result)
    //     });
    // },

    //Updating deatils for the logged in user 
    update: function (req, res) {
        db.parents.update(
            //Fields to update 
            {
                userName: req.body.userName,
                //Re-generate Hashed Password for the user 
                // passw: db.users.generateHash(req.body.password) , 
                city: req.body.city,
                state: req.body.state,
                  photoLink : req.body.photoLink
            }, {
                where: {
                    id: req.session.passport.user.id
                }
            }).then(function (dbParent) {

                console.log("Parent Information Updated", dbParent);
                console.log("1");
                res.json(dbParent);
            })
            .catch(err => res.status(422).json(err));
    },

    checkStatus: function (req, res) {
        if (req.isAuthenticated()) {
            res.json({ loggedIn: true })
        }
        res.json({ loggedIn: false })

    }
}

