import asyncHandler from '../../utils/async'
import { StripeService } from '../../service/stripe'


export class PaymentIntentRoutesController {
    stripe = new StripeService()

    constructor() { }
    create = asyncHandler(async (req: any, res: Response | any): Promise<Response | void> => {
        const { user, body } = req
        // const stripe  =await  this.stripe.createCharge()
        // console.log("stripe",stripe)

        // const balanceCheck =await this.stripe.checkBalance("acct_1P1zjzQOqimQeNIJ")
        // console.log("balanceCheck",balanceCheck)

        const invoice = await this.stripe.tranferCreditBalance()
        console.log("invoice", invoice)

        res.status(200).send({
            success: true,
            message: 'success',
            data: invoice,
        });

    });


    updateAccount = asyncHandler(async (req: any, res: Response | any): Promise<Response | void> => {
        const { user, body } = req
        // const stripe  =await  this.stripe.createCharge()
        // console.log("stripe",stripe)

        // const balanceCheck =await this.stripe.checkBalance("acct_1P1zjzQOqimQeNIJ")
        // console.log("balanceCheck",balanceCheck)

        const account = await this.stripe.updateAccount()
        console.log("invoice", account)

        res.status(200).send({
            success: true,
            message: 'success',
            data: account,
        });




    });


    createPerson = asyncHandler(async (req: any, res: Response | any): Promise<Response | void> => {
        const { user, body } = req
        // const stripe  =await  this.stripe.createCharge()
        // console.log("stripe",stripe)

        // const balanceCheck =await this.stripe.checkBalance("acct_1P1zjzQOqimQeNIJ")
        // console.log("balanceCheck",balanceCheck)

        const account = await this.stripe.createPerson()
        console.log("invoice", account)

        res.status(200).send({
            success: true,
            message: 'success',
            data: account,
        });




    });


    updatePerson = asyncHandler(async (req: any, res: Response | any): Promise<Response | void> => {
        const { user, body } = req
        // const stripe  =await  this.stripe.createCharge()
        // console.log("stripe",stripe)

        // const balanceCheck =await this.stripe.checkBalance("acct_1P1zjzQOqimQeNIJ")
        // console.log("balanceCheck",balanceCheck)

        const account = await this.stripe.personUpdate()
        console.log("invoice", account)

        res.status(200).send({
            success: true,
            message: 'success',
            data: account,
        });

    });

    createPaymentDebit = asyncHandler(async (req: any, res: Response | any): Promise<Response | void> => {
        const { user, body } = req
        // const stripe  =await  this.stripe.createCharge()
        // console.log("stripe",stripe)

        // const balanceCheck =await this.stripe.checkBalance("acct_1P1zjzQOqimQeNIJ")
        // console.log("balanceCheck",balanceCheck)

        const stripe = await this.stripe.paymentIntentUsingDebit()
        console.log("invoice", stripe)

        res.status(200).send({
            success: true,
            message: 'success',
            data: stripe,
        });

    });


    forChecking = asyncHandler(async (req: any, res: Response | any): Promise<Response | void> => {
          const { user } = req
    
          console.log("useruseruser", user)
    
          const checkCustomer = await this.stripe.forCheck({ customerId: "cus_PvekaxpCPBHfEP" })
          // const balance = await this.service.checkBalance(user.stripe_customerId)
          // const getPayment = await this.service.getPaymentMethod({ customer: user.stripe_customerId })
          // const keyToAdd = "default_method"
    
          // if (!balance) throw new BadRequestError("Balance not found")
          // // @ts-ignore
          // const default_method = getPayment.data?.filter((val: any) => val.id === balance.default_source);
    
          // const paymentMethod = getPayment.data.map((obj: any) => {
          //   if (default_method.length === 0) throw new BadRequestError("Default method not found")
          //   if (obj.id === default_method[0].id) {
          //     return {
          //       ...obj,
          //       [keyToAdd]: keyToAdd
          //     };
          //   }
          //   return obj;
          // });
    
          res.status(200).send({
            success: true,
            message: 'success',
            data: checkCustomer,
        });
        }
      )
      invoiceUsingAccountBalance = asyncHandler(async (req: any, res: Response | any): Promise<Response | void> => {
        const { user } = req
  
        console.log("useruseruser", user)
  
        const checkCustomer = await this.stripe.invoiceUsingAccountBalance({ customerId: "cus_PvekaxpCPBHfEP" })
        // const balance = await this.service.checkBalance(user.stripe_customerId)
        // const getPayment = await this.service.getPaymentMethod({ customer: user.stripe_customerId })
        // const keyToAdd = "default_method"
  
        // if (!balance) throw new BadRequestError("Balance not found")
        // // @ts-ignore
        // const default_method = getPayment.data?.filter((val: any) => val.id === balance.default_source);
  
        // const paymentMethod = getPayment.data.map((obj: any) => {
        //   if (default_method.length === 0) throw new BadRequestError("Default method not found")
        //   if (obj.id === default_method[0].id) {
        //     return {
        //       ...obj,
        //       [keyToAdd]: keyToAdd
        //     };
        //   }
        //   return obj;
        // });
  
        res.status(200).send({
          success: true,
          message: 'success',
          data: checkCustomer,
      });
      }
    )


    payoutBalanceTranfer = asyncHandler(async (req: any, res: Response | any): Promise<Response | void> => {
        const { user } = req
  
        console.log("useruseruser", user)
  
        const checkCustomer = await this.stripe.stripePayouts({ customerId: "cus_PvekaxpCPBHfEP" })
        // const balance = await this.service.checkBalance(user.stripe_customerId)
        // const getPayment = await this.service.getPaymentMethod({ customer: user.stripe_customerId })
        // const keyToAdd = "default_method"
  
        // if (!balance) throw new BadRequestError("Balance not found")
        // // @ts-ignore
        // const default_method = getPayment.data?.filter((val: any) => val.id === balance.default_source);
  
        // const paymentMethod = getPayment.data.map((obj: any) => {
        //   if (default_method.length === 0) throw new BadRequestError("Default method not found")
        //   if (obj.id === default_method[0].id) {
        //     return {
        //       ...obj,
        //       [keyToAdd]: keyToAdd
        //     };
        //   }
        //   return obj;
        // });
  
        res.status(200).send({
          success: true,
          message: 'success',
          data: checkCustomer,
      });
      }
    )

}