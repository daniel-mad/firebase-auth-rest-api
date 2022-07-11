import { Request, Response } from 'express';

import { sign } from 'jsonwebtoken';
import auth, { admin, db } from './../utils/firebase.util';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const Reister = async (req: Request, res: Response) => {
  const user = req.body; // TODO implement validation
  try {
    const userAuth = await admin.auth().createUser({
      email: user.email,
      password: user.password,
    });

    const { uid, email } = userAuth;

    const dbUser = {
      uid,
      first_name: user.first_name,
      last_name: user.last_name,
      email,
      address: user.address,
      createdAt: Date.now(),
      isAdmin: false,
    };

    await db.collection('users').doc(uid).set(dbUser);

    const token = sign({ id: uid }, 'secret'); // TODO put in env file

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(201).json(dbUser);
  } catch (e: any) {
    res.status(500).json(e);
  }
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userAuth: any = signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => userCredential.user)
      .catch((e) => {
        res.status(400).json({
          message: 'wrong email or password.',
        });
      });

    const { uid } = await userAuth;
    const doc = await db.collection('users').doc(uid).get();
    const user = doc.data();

    const token = sign({ id: uid }, 'secret'); // TODO put in env file

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.json(user);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const Profile = async (req: Request | any, res: Response) => {
  const user = req['user'];
  res.json(user);
};
