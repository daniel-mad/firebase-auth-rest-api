import * as express from 'express';

import { Reister, Login, Profile } from './../controllers/auth.controler';
import { AuthMiddleware } from './../middleware/auth.middleware';

const router = express.Router();

router.post('/register', Reister);
router.post('/login', Login);
router.get('/profile', AuthMiddleware, Profile);

export default router;
