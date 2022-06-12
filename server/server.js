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
const waterRouter = require('./routes/modules/water');
const accountsRouter = require('./routes/accounts')

// Routers
app.use('/water', waterRouter);
app.use('/accounts', accountsRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})
