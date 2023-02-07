module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {}, { underscored: true });

  Favorite.associate = (db) => {
    Favorite.belongsTo(db.Manga, {
      foreignKey: {
        name: 'mangaId',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });

    Favorite.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });
  };

  return Favorite;
};
