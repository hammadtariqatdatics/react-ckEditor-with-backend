module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    comment: DataTypes.STRING,
    sentiment: DataTypes.STRING,
  });

  return Comment;
};
