var db = require("../models")

module.exports = {
    create: function (req, res, parentId) {
        if (req.isAuthenticated()) {
            db.kids.create({
                name: req.body.name,
                gradeLevel: req.body.gradeLevel,
                //get parentId from the result of creating a parent row
                parentId: req.session.passport.user.id,
                schoolId: req.body.schoolId
            }).then(function (result) {
                res.json(result)
            })
        }
    },

    //update kids info function as a stretch goal
    update: function(req,res){
        // console.log("Step 2 inside kid controller", req.params.id); 
        if (req.isAuthenticated()) {
            db.kids.update(
                {   //Fields to update 
                    name: req.body.name,
                    gradeLevel: req.body.gradeLevel,
                    schoolId: req.body.schoolId
                }, {
                    where: {
                       id: req.params.id
                    }
                }).then(function (dbKidInfo) {
                    // console.log("update child info for ", dbKidInfo);
                    res.json(dbKidInfo)
                })
                .catch(err => res.status(422).json(err));
        }
    },
    // find all kids for a specific Logged in parent
    findAllKidsForAParent: function (req, res) {
        // console.log("Logged Parent id ", req.session.passport.user.id); 
        db.kids.findAll({
            attributes: ['id', 'gradeLevel', 'schoolId', 'parentId', 'name'],
            where: {
                parentId: req.session.passport.user.id
            },
            include: [
                {
                    model: db.schools,
                    as: "school", 
                    required: true
                }
            ]
        }).then(function (result) {
            // console.log("All kids info for a parent: ", result);
            res.json(result)
        })
        .catch(err => res.status(422).json(err));
    }, 
    // find all kids for all parent(s)
    findAllKids: function (req, res) {
        // console.log("Parent id ", req.params.id); 
        db.kids.findAll({
            attributes: ['id', 'gradeLevel'],
            where: {
                parentId: req.params.id
            },
            include: [
                {
                    model: db.schools,
                    as: "school", 
                    required: true, 
                    order: [
                        ['id', 'ASC']
                    ]
                }
            ]
        }).then(function (result) {
            // console.log("All kids info for a parent: ", result);
            res.json(result)
        })
        .catch(err => res.status(422).json(err));
    }, 
    //delete one single kid 
    delete: function(req,res){
        console.log("Delete child's Info"); 
        db.kids.destroy({
            where: {id: req.params.id}
        }).then(function(deletedKid){
            console.log(`Has the kid been deleted? 1 means yes, 0 means no: ${deletedKid}`);
            res.json(deletedKid);
        })
        .catch(err => res.status(422).json(err));
    }
}
