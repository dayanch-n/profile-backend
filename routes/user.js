import express from 'express';
import * as userCtrl from '../controllers/user.js';

const router = express.Router();


router.get("/people/:userId", userCtrl.getPeople);
router.put('/account/:userId', userCtrl.updateUser);
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);


export default router;