module.exports = (sequelize, Sequelize) => {
    const Document = sequelize.define('document', {
        id: {
            type: Sequelize.INTEGER,
        },
        title: {
            type: Sequelize.STRING,
        },
        writer: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.BOOLEAN,
        },
    });
    return Document;
}
