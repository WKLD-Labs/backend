const express = require('express');
const cors = require('cors');
const config = require('dotenv');
const app = express();
const port = 5500;
const memberRoute = require('./app/routes/member.routes');
const majorRoute = require('./app/routes/major.routes');
const authRoute = require('./app/routes/auth.routes');
const inventoryRoute = require('./app/routes/inventory.routes');

app.use(express.json({ limit: '10mb'}));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const db = require('./app/models');
db.sequelize.sync();

app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/member', memberRoute);
app.use('/api/major', majorRoute);
app.use('/api', authRoute);
app.use('/api/inventory', inventoryRoute);

app.listen(port, () => console.log(`App listening on port http://localhost:${port}!`));
