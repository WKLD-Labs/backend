module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define('Jadwal', {
        activity: {
            type: Sequelize.STRING,
        },
        participant: {
            type: Sequelize.DATE,
        },
        time: {
            type: Sequelize.DATE,
        },
        status: {
            type: Sequelize.TEXT,
        },
        
        
    });
    return Inventory;
}