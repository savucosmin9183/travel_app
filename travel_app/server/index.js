const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const errorMiddlewares = require('./Errors/index');
const routes = require('./Routes/index');

const app = express();

app.use(morgan(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length]'));
app.use(helmet());
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

app.use('/api/v1', routes);

app.use(errorMiddlewares.notFound);
app.use(errorMiddlewares.errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);
});