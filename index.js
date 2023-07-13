const cors = require('cors');
const express = require('express');
const { connection, PORT } = require('./config/db');
const { userRouter } = require('./routes/user.routes');
const { dashboardRouter } = require('./routes/dashboard.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', userRouter);
app.use('/dashboard', dashboardRouter);

app.listen(PORT || 8080, connection);
