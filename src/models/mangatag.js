module.exports = (sequelize, DataTypes) => {
  const MangaTag = sequelize.define(
    'MangaTag',
    {
      tagName: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );

  MangaTag.associate = (db) => {
    MangaTag.belongsTo(db.Manga, {
      foreignKey: {
        name: 'mangaId',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });
  };
  return MangaTag;
};
