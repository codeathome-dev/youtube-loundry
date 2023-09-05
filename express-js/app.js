const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');

const authCMSRouter = require('./app/api/v1/auth/router');
const unitsCMSRouter = require('./app/api/v1/units/router');

dotenv.config();
const urlV1 = '/api/v1/cms';

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${urlV1}/auth`, authCMSRouter);
app.use(`${urlV1}/units`, unitsCMSRouter);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
