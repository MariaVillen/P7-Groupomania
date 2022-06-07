const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Reports = require("./Report");
const Comments = require("./Comment");

const Posts = sequelize.define(
  "posts",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    attachement: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    totalLikes: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    totalComments: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      get: function () {
        return this.getDataValue("createdAt")?.toLocaleString();
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      get: function () {
        return this.getDataValue("updatedAt")?.toLocaleString();
      },
    },
    deletedAt: {
      type: DataTypes.DATE,
      get: function () {
        return this.getDataValue("deletedAt")?.toLocaleString();
      }
    }
  }
);

// Associations
Posts.hasMany(Comments, {onDelete: "CASCADE"});
Comments.belongsTo(Posts);

Posts.hasMany(Reports , {onDelete: "CASCADE"});
Reports.belongsTo(Posts);

module.exports = Posts;
