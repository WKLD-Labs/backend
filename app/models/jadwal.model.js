module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define('Jadwal', {
        eventname: {
            type: Sequelize.STRING,
        },
        starttime: {
            type: Sequelize.DATE,
        },
        endtime: {
            type: Sequelize.DATE,
        },
        description: {
            type: Sequelize.TEXT,
        },
        
    });
    return Inventory;
}