// import {UserRepository,UserModel} from './repository'
import { Router } from 'express';
import {UserController} from './controller'
import validator from '../../midlleware/joi'
import { userSchema } from './rules';
import {upload} from '../../midlleware/multer'

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
    this.router.post('/auth/upload',upload ,this.controller.upload);
 }
    
    


  }