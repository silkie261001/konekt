import express from 'express';

const router = express.Router();


// MIDDLEWARE
// import { requireSignin } from '../middlewares/auth';
import {register ,login,currentUser,forgotPassword} from "../controllers/auth";
import {requireSignin} from '../middlewares/ss.js';

router.post('/register',register);
router.post('/login',login)
router.post('/forgot-password',forgotPassword);
router.get('/current-user',requireSignin, currentUser);



module.exports = router; 