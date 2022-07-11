import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { db } from '../utils/firebase.util';

export const AuthMiddleware = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwt = req.cookies['jwt'];
    const payload: any = verify(jwt, 'secret'); // TODO put in env file
    const user = await db.collection('users').doc(payload.id).get();
    if (!user.exists) throw new Error('Invalid Credentials');
    req['user'] = user.data();
    next();
  } catch (e: any) {
    return res.status(401).json({
      message: e.message,
    });
  }
};
