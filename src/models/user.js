module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
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
        type: DataTypes.ENUM,
        values: ['ADMIN', 'USER'],
        allowNull: false,
        defaultValue: 'USER'
      }
    },
    {
      underscored: true
    }
  );
  return User;
};
