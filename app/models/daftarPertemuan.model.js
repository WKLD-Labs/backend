module.exports = (sequelize, Sequelize) =>
  sequelize.define("daftar_pertemuan", {
    meetingname: {
        type: Sequelize.STRING,
    },
    speaker: {
        type: Sequelize.STRING,
    },
    datetime: {
        type: Sequelize.DATE,
    },
    meetinglink: {
        type: Sequelize.TEXT,
    },
    description: {
        type: Sequelize.TEXT,
    },
  });