import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import personRouter from './resources/person/person.router';
import userRouter from './resources/user/user.router';
import loginRouter from './resources/login/login.router';
import { notFound, developmentErrors, productionErrors } from './utils/errorHandler';
import fs from 'fs';

const customCss = fs.readFileSync(process.cwd() + '/swagger.css', 'utf8');
const app = express();

app.disable('x-powered-by');

const corsOptions = {
  origin: ['https://gifted-wilson-b2cdbb.netlify.app'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/user', userRouter);
app.use('/api/person', personRouter);
app.use('/api/login', loginRouter);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss }));

// if 404
app.use(notFound);

// if another error is showed
if (app.get('env') === 'development') {
  app.use(developmentErrors);
}

// prod error handler
app.use(productionErrors);

module.exports = app;
