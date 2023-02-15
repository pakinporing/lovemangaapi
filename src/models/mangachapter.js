module.exports = (sequelize, DataTypes) => {
  const MangaChapter = sequelize.define(
    'MangaChapter',
    {
      chapter: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );

  MangaChapter.associate = (db) => {
    console.log(db);
    MangaChapter.belongsTo(db.Manga, {
      foreignKey: {
        name: 'mangaId',
        allowNull: false
      },
      onDelete: 'CASCADE'
    });
  };

  return MangaChapter;
};
