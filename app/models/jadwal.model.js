module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define('Jadwal', {
        activity: {
            type: Sequelize.STRING,
        },
        participant: {
            type: Sequelize.STRING,
        },
        date: {
            type: Sequelize.DATE,
        },
        status: {
            type: Sequelize.BOOLEAN,
        },
        
        
    });
    return Inventory;
}