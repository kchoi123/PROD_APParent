//creating Kid model for kids table
module.exports = function(sequelize, DataTypes){
    var Kid = sequelize.define("kids", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        gradeLevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validation: {
                min: 1,
                max:12
            }
        }
    })

    Kid.associate = function (models) {
        Kid.belongsTo(models.parents, {
            foreignKey: {
                allowNull: false
              }
        });
        Kid.belongsTo(models.schools, {
            foreignKey: {
                allowNull: false
              }
        });

      };
    return Kid
}