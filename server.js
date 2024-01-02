const express = require('express');
const cors = require('cors');
const config = require('dotenv');
const app = express();
const port = 5500;
const roomScheduleRoute = require('./app/routes/roomschedule.routes');
const memberRoute = require('./app/routes/member.routes');
const authRoute = require('./app/routes/auth.routes');
const agendaRoute = require('./app/routes/agenda.routes');
const inventoryRoute = require('./app/routes/inventory.routes');

app.use(express.json({ limit: '10mb'}));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const db = require('./app/models');
const userSeeder = require('./app/seeders/user.seeder');
db.sequelize.sync().then(async () => {
    console.log('Database synced successfully');

    try {
        await userSeeder.seedUsers();
        console.log('Seeder executed successfully');
    } catch (error) {
        console.error('Error running seeder:', error);
    }

});


app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/roomschedule', roomScheduleRoute);
app.use('/api/member', memberRoute);
app.use('/api', authRoute);
app.use('/api/agenda', agendaRoute);
app.use('/api/inventory', inventoryRoute);

app.listen(port, () => console.log(`App listening on port http://localhost:${port}!`))