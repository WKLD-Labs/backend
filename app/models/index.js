require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        operatorAlias: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    });
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// define semua models yang ada pada aplikasi
db.member = require('./member.model')(sequelize, Sequelize);
db.lecturer = require('./lecturer.model')(sequelize, Sequelize);
db.user = require('./user.model')(sequelize, Sequelize);
db.agenda = require('./agenda.model')(sequelize, Sequelize);
db.jadwal = require('./jadwal.model')(sequelize, Sequelize);
db.document = require('./document.model')(sequelize, Sequelize);
db.daftarPertemuan = require('./daftarPertemuan.model')(sequelize, Sequelize);
db.roomschedule = require('./roomschedule.model')(sequelize, Sequelize);
db.inventory = require('./inventory.model')(sequelize, Sequelize);
module.exports = db;
