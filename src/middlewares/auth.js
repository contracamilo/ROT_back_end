import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { AUTH_API_SEED } = process.env;

/**
 * tokenVerify validates if the token provided is valid.
 *
 * @param {object} req request properties.
 * @param {object} res response of the request.
 * @param {object} next middleware step.
 * @return {object} response.
 */
export const tokenVerify = (req, res, next) => {
  let token = req.get('Authorization');

  jwt.verify(token, AUTH_API_SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err,
      });
    }

    req.user = decoded.user;
    next();
  });
};

/**
 * adminRoleVerify validates if the token provided is valid.
 *
 * @param {object} req request properties.
 * @param {object} res response of the request.
 * @param {object} next middleware step.
 * @return {object} response.
 */
export const adminRoleVerify = (req, res, next) => {
  let user = req.user;

  if (user.role === 'ADMIN_ROLE') {
    next();
  } else {
    return res.json({
      ok: false,
      err: {
        message: 'Admin role needed',
      },
    });
  }
};
