const express = require('express');
const cors = require('cors');
const config = require('dotenv');
const app = express();
const port = 5500;
const memberRoute = require('./app/routes/member.routes');
const authRoute = require('./app/routes/auth.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');
db.sequelize.sync();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/member', memberRoute);
app.use('/api', authRoute);

app.listen(port, () => console.log(`App listening on port http://localhost:${port}!`));
