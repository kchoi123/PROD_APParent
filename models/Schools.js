// export the "School" model defined
module.exports = function(sequelize, DataTypes) {
    // Creates a "School" model 
    var School = sequelize.define("schools", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        streetAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zipcode: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
                len: [5,5]
            }
        }
    })

    School.associate = function(models) {
        // a school belongs to many parents
        School.belongsToMany(models.parents, {
            as: "parents",
            // cross-reference table because a parent can have many schools as well
            through: "parentSchools",
            foreignKey: "schoolId"
        });
        // a school has many kids
        // if the school is deleted, all the info related to this is deleted on the kids table
        School.hasMany(models.kids, {
            onDelete: "cascade"
        });
    }


    return School;
}