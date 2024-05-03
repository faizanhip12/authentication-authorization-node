// import {UserRepository,UserModel} from './repository'
import { Router } from 'express';
import {PaymentIntentRoutesController} from './controller'
// import { verifyToken } from '../../utils/token'
export class PaymentIntentRoutes {

    readonly router: Router = Router();
    readonly controller:PaymentIntentRoutesController = new PaymentIntentRoutesController()
   
    constructor(){
        this.initRoutes()
        console.log("route")
    }

 initRoutes(){
    this.router.post('/pay',this.controller.create);

    this.router.post('/update-account',this.controller.updateAccount);


    this.router.post('/create-person',this.controller.createPerson);


    this.router.post('/update-person',this.controller.updatePerson);



    this.router.post('/payment-intent-bank',this.controller.createPaymentDebit);

    this.router.get('/checking-stripe',
 
    this.controller.forChecking
  )



  this.router.get('/create-invoice-funds-account',
 
  this.controller.invoiceUsingAccountBalance
)



this.router.get('/transfered-payouts',
 
this.controller.payoutBalanceTranfer
)







 
 }
    
    


  }