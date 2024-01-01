module.exports = (sequelize, Sequelize) => {
    const Agenda = sequelize.define('agenda', {
        name: {
            type: Sequelize.STRING,
        },
        start_date: {
            type: Sequelize.DATE,
        },
        end_date: {
            type: Sequelize.DATE,
        },
    });
    return Agenda;
}