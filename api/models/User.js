const db = require("../database/db");
const bcrypt = require("bcrypt");
const { DataTypes, Model } = require("sequelize");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
    },
    favoritesID: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      set(value) {
        this.setDataValue('favoritesID', value);
      },
    },
  },
  {
    sequelize: db,
    modelName: "user",
  }
);

User.beforeCreate((user) => {
  return bcrypt
    .genSalt(16)
    .then((salt) => {
      user.salt = salt;
      return user.hash(user.password, user.salt);
    })
    .then((hash) => {
      user.password = hash;
    });
});

User.prototype.hash = function (password, salt) {
  return bcrypt.hash(password, salt);
};
module.exports = User;
