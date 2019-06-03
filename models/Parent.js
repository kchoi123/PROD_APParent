var bcrypt = require("bcryptjs")

// Creating parent model for parents table
module.exports = function(sequelize, DataTypes) {
  var Parent = sequelize.define("parents", {
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [2, 25]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true, // checks for email format (test@test.com)
      validate: {
        notEmpty: true
      }
    },
    city: {
      type: DataTypes.STRING,
      is: ["^[a-z]+$", "i"], // will only allow letters
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      is: ["^[a-z]+$", "i"], // will only allow letters
      allowNull: false
    }, 
    //Add an image link for portfolio 
    photoLink: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'http://lorempixel.com/600/500/people'
    }
  });

  //Method for generating hashed password
  Parent.generateHash = function (password) {
    return bcrypt.hashSync(password, 8)
  };

  //Method for comparing hashed password to user input password
  Parent.prototype.compareHash = function (password) {
    return bcrypt.compareSync(password, this.password)
  };

  Parent.associate = function(models) {
    Parent.hasMany(models.posts, {
      onDelete: "cascade"
    });
    Parent.belongsToMany(models.schools, {
      as: "schools",
      through: "parentSchools",
      foreignKey: "parentId"
    });
    Parent.hasMany(models.comments, {
      onDelete: "cascade"
    });
  };

  return Parent;
};
