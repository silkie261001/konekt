import User from '../models/user';
import { hashPassword, comparePassword } from '../helpers/auth.js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
// import { expressjwt } from "express-jwt";

export const register = async (req, res) => {
  const { name, email, password, secret } = req.body;

  //validation
  if (!name) return res.status(400).send('Name is required');
  if (!password || password.length < 6)
    return res
      .status(400)
      .send('password is required and should be 6 character long');
  if (!secret) return res.status(400).send('answer is required');
  const exist = await User.findOne({ email });
  if (exist) return res.status(400).send('email is taken');

  // hash password
  const hashedPassword = await hashPassword(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    secret,
    username: uuidv4(),
  });
  try {
    // const hashpassword = await hashPassword(password);
    // const user = new User({name, email, password:hashpassword ,secret});
    await user.save();
    // console.log("registered user =>" ,user);
    return res.json({
      ok: true,
    });
  } catch (err) {
    console.log('register fail =>', err);
    return res.status(400).send('error, try again');
  }
};

export const login = async (req, res) => {
  // console.log(req.body)
  try {
    const { email, password } = req.body;
    // check if our db has user with this database
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid Credentials');
    // check password
    const match = await comparePassword(password, user.password);

    if (!match) return res.status(400).send('Invalid Credentials');

    //create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send('error try again');
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
    // console.log("doone");
    res.json({
      ok: true,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const forgotPassword = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, newPassword, secret } = req.body;
    // validation
    console.log(email);
    if (!newPassword || newPassword.length < 6) {
      return res
        .status(400)
        .send('password is required and should be 6 character long');
    }

    if (!secret) {
      return res.status(400).send('Secret is required');
    }

    const user = await User.findOne({ email, secret });

    if (!user) {
      return res.status(400).send('Invalid Credentials');
    }
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    return res.status(400).send('password changed');
  } catch (err) {
    console.log(err);
    return res.json({
      error: 'something wrong',
    });
  }
};

export const profileUpdate = async (req, res) => {
  try {
    console.log('profile ', req.body);
    const data = {};

    if (req.body.username) {
      data.username = req.body.username;
    }
    if (req.body.about) {
      data.about = req.body.about;
    }
    if (req.body.name) {
      data.name = req.body.name;
    }
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.json({
          error: 'password should be minimum 6 character long',
        });
      } else {
        data.password = await hashPassword(req.body.password);
      }
    }
    if (req.body.secret) {
      data.secret = req.body.secret;
    }

    if (req.body.image) {
      data.image = req.body.image;
    }

    let user = await User.findByIdAndUpdate(req.auth._id, data, { new: true });

    user.password = undefined;
    user.secret = undefined;
    res.json(user);
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ errpr: 'duplicate username' });
    }
  }
};
