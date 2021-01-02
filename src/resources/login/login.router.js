import { Router } from 'express';
import User from '../user/user.model';
import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { AUTH_API_SEED } = process.env;

const router = Router();

// api/login
router.route('/').post((req, res) => {
  const { body } = req;

  User.findOne({ email: `${body.email}` }, (err, dbUser) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        err: {
          message: '(user) or pass or both are invalid',
        },
      });
    }

    //Compare encrypted passwords
    const isPasswordValid = compareSync(body.password, dbUser.password);

    if (!isPasswordValid) {
      res.status(400).json({
        ok: false,
        err: {
          message: 'user or (pass) or both are invalid',
        },
      });
    }

    let token = jwt.sign(
      {
        user: dbUser,
      },
      AUTH_API_SEED,
      { expiresIn: 60 * 60 * 24 * 30 }
    );

    res.json({
      ok: true,
      user: dbUser,
      token,
    });
  });
});

export default router;
