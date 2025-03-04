import express from 'express';

import {getAnalytics, } from '../controllers/analytics.controller.js';
import { checkForToken } from '../middlewares/user.middleware.js';


const analyticsRouter = express.Router();

analyticsRouter.get('/analytics',checkForToken,getAnalytics);

export default analyticsRouter;
