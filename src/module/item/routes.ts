import { Router } from 'express';
import {TutorialController} from './controller'
import validator from '../../midlleware/joi'

import {upload} from '../../midlleware/cloudnairy'
// import passport from 'passport';
import passport from '../../utils/oAuth'

export class TutorialRoutes {

    readonly router: Router = Router();
    readonly controller:TutorialController = new TutorialController()
   
    constructor(){
        this.initRoutes()
        console.log("route")
    }

 initRoutes(){
    this.router.post('/tutorial', this.controller.create);
    this.router.get('/tutorial', this.controller.getAll);
    // this.router.post('/auth/signin',validator(login), this.controller.signin);
    // this.router.post('/auth/generate-token', this.controller.refreshToken);
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
    // this.router.post('/auth/upload',upload.single('image'),this.controller.upload);
 }
    
    


  }