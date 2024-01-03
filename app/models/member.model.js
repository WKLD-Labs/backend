module.exports = (sequelize, Sequelize) => {
    const Member = sequelize.define('member', {
        nim: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
        },
        faculty: {
            type: Sequelize.STRING,
        },
        major: {
            type: Sequelize.STRING,
        },
        entryYear: {
            type: Sequelize.INTEGER,
        },
    });
    return Member;
}
