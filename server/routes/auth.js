import express from 'express';
// import ProfileUpdate from '../../client/pages/user/profile/update';

const router = express.Router();

// MIDDLEWARE
// import { requireSignin } from '../middlewares/auth';
import {
  register,
  login,
  currentUser,
  forgotPassword,
  profileUpdate,
  findPeople,
  userFollow,
  addFollower,
  userFollowing,
  removeFollower,
  userUnfollow,
} from '../controllers/auth';
import { requireSignin } from '../middlewares/ss.js';

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/current-user', requireSignin, currentUser);
router.put('/profile-update', requireSignin, profileUpdate);
router.get('/find-people', requireSignin, findPeople);
router.put('/user-follow', requireSignin, addFollower, userFollow);
router.put('/user-unfollow', requireSignin, removeFollower, userUnfollow);
router.get('/user-following', requireSignin, userFollowing);

module.exports = router;
