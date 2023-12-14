// import {UserRepository,UserModel} from './repository'
import { Router } from 'express';
import {UserController} from './controller'

export class UserRoutes {

    readonly router: Router = Router();
    readonly controller:UserController = new UserController()
   
    constructor(){
        this.initRoutes()
        console.log("route")
    }

 initRoutes(){
    this.router.post('/auth/signup', this.controller.signup);
    this.router.post('/auth/signin', this.controller.signin);
 }
    
    


  }