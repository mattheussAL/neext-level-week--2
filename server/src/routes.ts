import express from 'express';
import ClassesControllers from './controllers/classesController';
import ConnectionsController from './controllers/connectionsControllers';

const routes = express.Router();

const classesControllers = new ClassesControllers();
const connectionsontrollers = new ConnectionsController();

routes.get('/classes', classesControllers.index);
routes.post('/classes', classesControllers.create);

routes.get('/connections', connectionsontrollers.index)
routes.post('/connections', connectionsontrollers.create)

export default routes;