module.exports = (sequelize, DataTypes) => {
  const Manga = sequelize.define(
    'Manga',
    {
      mangaName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      mangaImageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );

  Manga.associate = (db) => {
    Manga.hasMany(db.MangaChapter, {
      foreignKey: {
        name: 'mangaId',
        allowNull: false
      },
      onDelete: 'CASCADE'
    });
    Manga.hasMany(db.MangaTag, {
      foreignKey: {
        name: 'mangaId',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });
    Manga.hasMany(db.Comment, {
      foreignKey: {
        name: 'mangaId',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });
    Manga.hasMany(db.Favorite, {
      foreignKey: {
        name: 'mangaId',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });
  };

  return Manga;
};
