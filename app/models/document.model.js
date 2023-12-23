module.exports = (sequelize, Sequelize) => {
    const Document = sequelize.define('document', {
        title: {
            type: Sequelize.STRING,
        },
        writer: {
            type: Sequelize.STRING,
        },
    });
    return Document;
}