import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

// MIDDLEWARE
// import { requireSignin } from '../middlewares/auth';
import {
  createPost,
  uploadImage,
  postByUser,
  userPost,
  updatePost,
  deletePost,
  fashionFeed,
} from '../controllers/post';
import { requireSignin, canEditDeletePost } from '../middlewares/ss.js';

router.post('/create-post', requireSignin, createPost);
router.post(
  '/upload-image',
  requireSignin,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);

router.get('/user-posts', requireSignin, postByUser);
router.get('/user-post/:_id', requireSignin, userPost);
router.put('/update-post/:_id', requireSignin, canEditDeletePost, updatePost);
router.delete(
  '/delete-post/:_id',
  requireSignin,
  canEditDeletePost,
  deletePost
);

router.get('/fashion-feed', requireSignin, fashionFeed);
module.exports = router;
