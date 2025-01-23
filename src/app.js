const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');
const cors = require("cors")

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

const adminRoutes = require('./routes/admin');
const contractRoutes = require('./routes/contract');
const jobRoutes = require('./routes/job');
const profileRoutes = require('./routes/profile');

app.use('/admin', adminRoutes);
app.use('/contracts', contractRoutes);
app.use('/balances', profileRoutes);
app.use('/jobs', jobRoutes);

module.exports = app;
