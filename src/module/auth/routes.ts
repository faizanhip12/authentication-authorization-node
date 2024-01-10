// import {UserRepository,UserModel} from './repository'
import { Router } from 'express';
import {UserController} from './controller'
import validator from '../../midlleware/joi'
import { userSchema } from './rules';
import {upload} from '../../midlleware/cloudnairy'
// import passport from 'passport';
import passport from '../../utils/oAuth'

export class UserRoutes {

    readonly router: Router = Router();
    readonly controller:UserController = new UserController()
   
    constructor(){
        this.initRoutes()
        console.log("route")
    }

 initRoutes(){
    this.router.post('/auth/signup',validator(userSchema), this.controller.signup);
    this.router.post('/auth/signin', this.controller.signin);
    this.router.post('/auth/generate-token', this.controller.refreshToken);
    // this.router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
    // this.router.get(
    //     '/auth/google/callback',
    //     passport.authenticate('google', { failureRedirect: '/' }),
    //     (req: Request | any, res: Response |any) => {
    //       // Create a JWT token and send it as a response
    //     //   const token = jwt.sign({ user: req.user }, 'your-secret-key', { expiresIn: '1h' });
    //     //   res.cookie('token', token);
    //     //   res.redirect('/');
    //     }
    //   );
    // this.router.post('/auth/upload',upload.single('file') ,this.controller.upload);
    this.router.post('/auth/upload',upload.single('image'),this.controller.upload);
 }
    
    


  }