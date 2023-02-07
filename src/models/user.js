const { USER_USER, USER_ADMIN } = require('../config/constant');

module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING
        // allowNull: false,
        // validate: {
        //   notEmpty: true
        // }
      },
      userName: {
        type: DataTypes.STRING
        // allowNull: false,
        // validate: {
        //   notEmpty: true
        // }
      },
      lastName: {
        type: DataTypes.STRING
        // allowNull: false,
        // validate: {
        //   notEmpty: true
        // }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      profileImage: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM(USER_USER, USER_ADMIN),

        allowNull: false,
        defaultValue: USER_USER
      }
    },
    {
      underscored: true
    }
  );

  User.associate = (db) => {
    User.hasMany(db.Comment, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });

    User.hasMany(db.Favorite, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });
  };

  return User;
};
