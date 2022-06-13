const express = require("express");
//const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const db = require('./db');

db.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(res.rows[0]);
});

app.use(express.json());

dotenv.config();

// Router imports
const accountsRouter = require('./routes/accounts');

// Module routes
const waterRouter = require('./routes/modules/water');
const electricityRouter = require('./routes/modules/electricity');
const cqRouter = require('./routes/modules/cropQuality');

// Routers
app.use('/accounts', accountsRouter);

// Module routers
app.use('/water', waterRouter);
app.use('/electricity', electricityRouter);
app.use('/crop-quality', cqRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})
