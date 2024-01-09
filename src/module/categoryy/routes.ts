// import {UserRepository,UserModel} from './repository'
import { Router } from 'express';
import {CategoryController} from './controller'
import { verifyToken } from '../../utils/token'
export class ProductRoutes {

    readonly router: Router = Router();
    readonly controller:CategoryController = new CategoryController()
   
    constructor(){
        this.initRoutes()
        console.log("route")
    }

 initRoutes(){
    // this.router.get('/products',verifyToken, this.controller.get);
 
 }
    
    


  }