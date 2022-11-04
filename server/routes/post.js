import express from 'express';

const router = express.Router();


// MIDDLEWARE
// import { requireSignin } from '../middlewares/auth';
import { createPost } from "../controllers/post";
import {requireSignin} from '../middlewares/ss.js';

router.post('/create-post',requireSignin,createPost);

module.exports = router; 