const express = require("express");
//const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

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
