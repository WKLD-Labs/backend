module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define('inventory', {
        name: {
            type: Sequelize.STRING,
        },
        unit: {
            type: Sequelize.INTEGER,
        },
        date: {
            type: Sequelize.DATE,
        },
        picture: {
            type: Sequelize.BLOB("long"),
        },
        description: {
            type: Sequelize.STRING,
        },
    });
    return Inventory;
}