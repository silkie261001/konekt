import express from 'express';
import ProfileUpdate from '../../client/pages/user/profile/update';

const router = express.Router();

// MIDDLEWARE
// import { requireSignin } from '../middlewares/auth';
import {
  register,
  login,
  currentUser,
  forgotPassword,
  profileUpdate,
} from '../controllers/auth';
import { requireSignin } from '../middlewares/ss.js';

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/current-user', requireSignin, currentUser);
router.put('/profile-update', requireSignin, profileUpdate);

module.exports = router;
