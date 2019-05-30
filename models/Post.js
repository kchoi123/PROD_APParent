//creating Post model for posts table
module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [1]
      }
    }, 
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    imageUrl:{
      type: DataTypes.TEXT,
      allowNull: true
    }
  });


  Post.associate = function (models) {
    // Associating Post with comments
    // When an Post is deleted, also delete any associated comments
    Post.hasMany(models.comments, {
      onDelete: "cascade"
    });
    //A post cannot be created with a parent reference 
    Post.belongsTo(models.parents, {
      foreignKey: {allowNull : false }
    });

  };
  return Post;
};