//a ParentSchool model for cross-reference ParentSchool table
module.exports = function (sequelize, DataTypes) {
    var ParentSchool = sequelize.define('parentSchool', {
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'parents',
                key: 'id'
            }
        },
        schoolId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'schools',
                key: 'id'
            }
        }
    });

    return ParentSchool;
};