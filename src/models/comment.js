module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      comment: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );

  Comment.associate = (db) => {
    Comment.belongsTo(db.Manga, {
      foreignKey: {
        name: 'mangaId',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });

    Comment.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });
  };

  return Comment;
};
