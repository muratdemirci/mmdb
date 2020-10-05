﻿require('rootpath')();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(
    cors({
        origin: (origin, callback) => callback(null, true),
        credentials: true,
    }),
);

// api routes
app.use('/users', require('./users/users.controller'));

// swagger docs route
app.use('/api-docs', require('_helpers/swagger'));

// global error handler
app.use(errorHandler);

// start server
const port =
    process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 8080;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
