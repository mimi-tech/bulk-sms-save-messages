const { DataTypes } = require("sequelize");

module.exports = (db) => {
  const schema = db.define(
    "Messages",
    {
      msgId: { type: DataTypes.UUID, primaryKey: true },
      senderEmail: { type: DataTypes.STRING, allowNull: true},
      fullName: { type: DataTypes.STRING, allowNull: false},
      message: { type: DataTypes.STRING, allowNull: false},
      recieversNumber: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false},
      failedContacts: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true},
      senderId: { type: DataTypes.STRING, allowNull: false},
      amount: { type: DataTypes.INTEGER, allowNull: true},
      dateSent: { type: DataTypes.STRING, allowNull: true},
      title: { type: DataTypes.STRING, allowNull: true},
      count: { type: DataTypes.INTEGER, defaultValue:0},
    },
    {
      timestamps: true,
      tableName: "messages",
    }
  );
  schema.prototype.transform = function (admin) {
    let cols = [
    "msgId",
    "email",
    "dateSent",
    "message",
    "fullname",
    "recieversNumber",
    "senderId",
    "count",
    "failedContacts",
    "title",
    "amount"
  ];
    cols = admin ? [...cols, "createdAt"] : cols;
    const data = {};
    cols.forEach((v) => {
      data[v] = this.dataValues[v];
    });
    return data;
  };
  
  return schema;
};
