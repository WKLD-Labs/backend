module.exports = (sequelize, Sequelize) => {
    const Document = sequelize.define('document', {
        title: {
            type: Sequelize.STRING,
        },
        writer: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.BOOLEAN,
        },
    });
    return Document;
}
