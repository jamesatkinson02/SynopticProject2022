const express = require("express");
//const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const db = require('./db');
const jwtMiddleware = require('./middleware/jwtMiddleware');

// Middlewares
app.use(express.json());
app.use(jwtMiddleware);

dotenv.config();

// Router imports
const accountsRouter = require('./routes/accounts');
const devicesRouter = require('./routes/devices');

// Module routes
const waterRouter = require('./routes/modules/water');
const electricityRouter = require('./routes/modules/electricity');
const cqRouter = require('./routes/modules/cropQuality');

// Routers
app.use('/accounts', accountsRouter);
app.use('/devices', devicesRouter);

// Module routers
app.use('/water', waterRouter);
app.use('/electricity', electricityRouter);
app.use('/crop-quality', cqRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})
