module.exports = (sequelize, Sequelize) =>
  sequelize.define("room_schedule", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT('long')
    },
    start_date: {
      type: Sequelize.DATE,
    },
    end_date: {
      type: Sequelize.DATE,
    },
  });
