module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define("Article", {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    contentSummery: DataTypes.TEXT,
  });

  return Article;
};
