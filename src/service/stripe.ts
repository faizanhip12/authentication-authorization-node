import Stripe from 'stripe';
import { StripeCred } from '../config/stripe'


export class StripeService {
  readonly stripe: Stripe = new Stripe(StripeCred.clientSecret, { apiVersion: "2022-11-15" });

  async createCustomer(user: Stripe.CustomerCreateParams) {
    console.log("createCustomer", user)
    const customer = await this.stripe.customers.create(user);
    return customer;
  }

  // async createAccount(email: string) {
  //   const account = await this.stripe.accounts.create({
  //     type: 'express',
  //     country: 'US',
  //     email: email,
  //     capabilities: {
  //       card_payments: { requested: true },
  //       transfers: { requested: true },
  //     },
  //   });
  //   return account
  // }


  async createAccount(email: string) {
    const account = await this.stripe.accounts.create({
      country: 'US',
      type: 'custom',
      business_type: 'company',
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
      external_account: 'btok_us',
      tos_acceptance: {
        date: 1547923073,
        ip: '172.18.80.19',
      },
    });
    return account
  }

  async createCharge() {
    const charge = await this.stripe.charges.create({
      amount: 5000,
      currency: 'usd',
      description: "description",
      customer: "cus_PrjCY5qZF7EGqZ", // Customer ID associated with the customer's account
      source: 'cb_123456789',
      transfer_data: {
        destination: "acct_1P2Zb5QSHLxkWCjm", // Connected account ID
      },
    });
    return charge

  }

  async checkBalance(stripeAccount) {
    const balance = await this.stripe.balance.retrieve({
      stripeAccount,
    });
    return balance
  }

  // async invoice() {
  //   const invoiceItem = await this.stripe.invoiceItems.create({
  //     customer: 'cus_PrjCY5qZF7EGqZ',
  //     amount: 1000,
  //     currency: 'usd',
  //     description: 'anything',
  //   });

  //   console.log("invoiceItem", invoiceItem);

  //   // Retrieve customer's open invoices
  //   const invoices = await this.stripe.invoices.list({
  //     customer: 'cus_PrjCY5qZF7EGqZ',
  //     status: 'open',
  //   });

  //   console.log("invoices", invoices);

  //   let invoiceId;

  //   if (invoices.data.length > 0) {
  //     // If there are open invoices, pay the first open invoice
  //     invoiceId = invoices.data[0].id;
  //   } else {
  //     // If there are no open invoices, create a new invoice
  //     const newInvoice = await this.stripe.invoices.create({
  //       customer: 'cus_PrjCY5qZF7EGqZ', 
  //       description: 'Invoice for anything',
  //       auto_advance: true, // Automatically mark the invoice as paid after successful payment

  //     });
  //     invoiceId = newInvoice.id;
  //   }

  //   // Pay the invoice
  //   const invoice = await this.stripe.invoices.pay(invoiceId);

  //   return invoice



  // }

  // async invoice() {
  //   const newInvoice = await this.stripe.invoices.create({
  //     customer: 'cus_PrjCY5qZF7EGqZ',
  //     payment_settings: {
  //       payment_method_types: ['customer_balance'],
  //     },
  //     collection_method: 'send_invoice',
  //     days_until_due: 30,
  //   });
  //   console.log("Invoice created:", newInvoice);

  //   // Add invoice item
  //   const invoiceItem = await this.stripe.invoiceItems.create({
  //     amount: 1000,
  //     currency: 'usd',
  //     customer: 'cus_PrjCY5qZF7EGqZ',
  //     description: 'Professional services',
  //     invoice: newInvoice.id,
  //   });
  //   console.log("Invoice item added:", invoiceItem);

  //   // Finalize the invoice
  //   const finalizedInvoice = await this.stripe.invoices.pay(newInvoice.id);
  //   console.log("Invoice finalized:", finalizedInvoice);

  //   //    const transfer = await this.stripe.transfers.create({
  //   //         amount:1000,
  //   //         currency: 'usd',
  //   //         destination: 'destination_customer_id', // ID of the customer receiving the transfer
  //   //         //@ts-ignore
  //   //         source_transaction: finalizedInvoice.charge, // ID of the charge associated with the finalized invoice
  //   //         description: 'Transfer from customer balance',

  //   //     });
  //   // console.log("Balance transfer created:", transfer);

  //   return finalizedInvoice;


  // }

  async tranferCreditBalance() {
    //   const updatedAccount = await this.stripe.accounts.update("acct_1P1zjzQOqimQeNIJ", {
    //     capabilities: {
    //       transfers:{
    //         requested:true
    //       }
    //     }
    // });

    // return updatedAccount
    //  const paymentIntent = await this.stripe.paymentIntents.confirm('pi_3P5ZwNKuANEC8G8J1tPmffxs');

    //  console.log("paymentIntent",paymentIntent)

    // const intent = await this.stripe.paymentIntents.retrieve('pi_3P5ZwNKuANEC8G8J1tPmffxs');
    // const latest_charge = intent


    // return latest_charge

    const intent = await this.stripe.paymentIntents.retrieve('pi_3P5ZwNKuANEC8G8J1tPmffxs');
    const bankTransferInstructions = intent.next_action.display_bank_transfer_instructions;

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 100, // Amount in cents
      currency: 'usd',
      payment_method_types: ['card'],
      application_fee_amount: 10, // Platform fee in cents
      transfer_data: {
        destination: "acct_1P6iEGQLsrNS6MH7" // Connected account ID
      },
      confirm: true,
    });


    return paymentIntent

    // console.log("bankTransferInstructions",bankTransferInstructions)
    // const amountRemaining = bankTransferInstructions.amount_remaining;
    // const currency = bankTransferInstructions.currency;
    // const bankName = bankTransferInstructions.financial_addresses[0].aba.bank_name; // Assuming using ABA routing
    // const accountNumber = bankTransferInstructions.financial_addresses[0].aba.account_number;
    // const routingNumber = bankTransferInstructions.financial_addresses[0].aba.routing_number;
    // const reference = bankTransferInstructions.reference;
    // const instructionsURL = bankTransferInstructions.hosted_instructions_url;

    // return bankTransferInstructions

    // Check if the PaymentIntent status is "requires_action"
    // if (intent.status === 'requires_action') {
    //   // Further action is required from the customer's side
    //   console.log('Further action is required from the customer.');

    // // Identify charges associated with the PaymentIntent
    // const latestCharge = intent.latest_charge;
    // const charges = await this.stripe.charges.list({
    //   payment_intent: 'pi_3P5ZwNKuANEC8G8J1tPmffxs',
    // });
    //   // return charges
    //  const paymentIntent = this.stripe.paymentIntents.confirm(
    //     'pi_3P5ZwNKuANEC8G8J1tPmffxs_secret_yZVQQ7mJBgDflF6M7iPHM0uIU',
    //     {
    //       payment_method: 'pm_1P5ZwNKuANEC8G8J8f4zad8c',
    //     }
    //   )

    //   return paymentIntent

    // const paymentIntent = await this.stripe.paymentIntents.confirm(

    //   "pi_3P5ZwNKuANEC8G8J1tPmffxs", {
    //   payment_method: 'pm_1P5ZwNKuANEC8G8J8f4zad8c',

    // });


    // return paymentIntent

    // }


    // const account = await this.stripe.accounts.retrieve("acct_1P1zjzQOqimQeNIJ");
    // // return account;

    // // const customer = await this.stripe.customers.retrieve("cus_PrjCY5qZF7EGqZ");

    // const transfer = await this.stripe.transfers.create({
    //   amount: 1000,
    //   currency: "usd",
    //   destination: "acct_1P1zjzQOqimQeNIJ",
    // });
    // const balance = await this.stripe.balance.retrieve({
    //   stripeAccount: "acct_1P1zjzQOqimQeNIJ"
    // });

    // return balance

    //  console.log("customer",customer)

    // const addBalance = await this.stripe.customers.createBalanceTransaction(
    //   'cus_PrjCY5qZF7EGqZ',
    //   { amount: 10000, currency: 'usd', description: 'Add funds to credit balance' },

    // );

    // const deductBalance = this.stripe.customers.createBalanceTransaction(
    //   'cus_PrjCY5qZF7EGqZ',
    //   { amount: -10000, currency: 'usd', description: 'Add funds to credit balance' });


    // const paymentIntent = await this.stripe.paymentIntents.create({
    //   amount: 10000,
    //   currency: 'usd',
    //   customer: 'cus_PrjCY5qZF7EGqZ', // ID of the receiving customer
    //   description: 'Transfer from sender',
    //   payment_method_types: ['card'],
    // })

    // console.log("paymentIntent",paymentIntent)
  }


  async updateAccount() {
    const account = await this.stripe.accounts.update(
      'acct_1P6iEGQLsrNS6MH7',
      {
        business_profile: {
          mcc: '5045',
          url: 'https://bestcookieco.com',
        },
        company: {
          address: {
            city: 'Schenectady',
            line1: '123 State St',
            postal_code: '12345',
            state: 'NY',
          },
          tax_id: '000000000',
          name: 'The Best Cookie Co',
          phone: '8888675309',
        },
      }
    );
    return account
  }

  async createPerson() {
    const account = await this.stripe.accounts.createPerson(
      'acct_1P6iEGQLsrNS6MH7',
      {
        first_name: 'Jenny',
        last_name: 'Rosen',
        relationship: {
          representative: true,
          title: 'CEO',
        },
      }
    );
    return account
  }
  async personUpdate() {
    const account = await this.stripe.accounts.updatePerson(
      'acct_1P6iEGQLsrNS6MH7',
      'person_1P6jCVQLsrNS6MH7kqXEXtGb',
      {
        address: {
          city: 'Schenectady',
          line1: '123 State St',
          postal_code: '12345',
          state: 'NY',
        },
        dob: {
          day: 10,
          month: 11,
          year: 1980,
        },
        ssn_last_4: '0000',
        phone: '8888675309',
        email: 'jenny@bestcookieco.com',
        relationship: {
          executive: true,
        },
      }
    );
    return account
  }


  async paymentIntentUsingDebit() {



    const paymentMethod = {
      type: 'ach_debit',
      billing_details: {
        name: "bankDetails.name",
        email: "bankDetails.email",
        // ... other billing details
      },
      ach_debit: {
        account_number: "bankDetails.accountNumber",
        routing_number: "bankDetails.routingNumber",
        // ... other bank account details
      },
    };

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 10000,
      currency: 'usd',
      confirm: true,
      payment_method_types: ['card'], // Specify ACH Direct Debit
      payment_method: 'pm_card_visa',
      customer: "cus_PwbRRdeQNQEGwT", // Associate with the customer (if pre-collected info)
    });
    return paymentIntent;
  }
  async forCheck({ customerId }: { customerId: string }) {

    console.log("customerId", customerId)

    // const customer = await this.stripe.customers.retrieve("cus_PvekaxpCPBHfEP", {
    //   expand: ['sources'], // This expands the customer object to include payment methods (sources)
    // });

    // return customer

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 1000, // Replace with your desired amount in cents
      currency: 'usd',
      customer: "cus_PvekaxpCPBHfEP",
      payment_method: "card_1P8iazKuANEC8G8JDMH0CUBf", // Specify the card ID here
    });

    return paymentIntent


    //   const sources = await this.stripe.customers.listSources("cus_PvekaxpCPBHfEP", {
    //     limit: 10, // You can adjust the limit as needed
    //   });

    //  return sources

    // const findDriver = await UserRepo.findById(driverId)

    // const deduction = (amount * 74) / 100;
    // const result = amount - deduction;

    // const data = await this.transferAmount({ accountId: findDriver?.stripe_accountId || "", amount: Math.round(result) })
    // console.log("TRANSFER DATA", data);
  }



  async invoiceUsingAccountBalance({ customerId }: { customerId: string }) {

    console.log("customerId", customerId)

    const invoice = await this.stripe.invoices.create({
      // on_behalf_of: "acct_1P6iEGQLsrNS6MH7",
      application_fee_amount: 10000,
      transfer_data: {
        destination: "acct_1P6iEGQLsrNS6MH7",

      },
      payment_settings: {
        payment_method_types: ['customer_balance'],
      },
      customer: "cus_PwbRRdeQNQEGwT",
      currency: 'usd', // Replace with your desired currency code

    });


    const invoicePayout = await this.stripe.invoices.pay(invoice.id);

    return invoicePayout

  }


  async stripePayouts({ customerId }: { customerId: string }) {

    console.log("customerId", customerId)

    // const payout = await this.stripe.payouts.create({
    //   amount:1000,
    //   currency: 'usd',
    //   destination: 'acct_TEST_STRIPE_TEST_BANK'
    // });

    // return payout 
    const charge = await this.stripe.charges.create({
      amount: 1000,
      currency: 'usd',
      customer: "cus_PwbRRdeQNQEGwT",
      description: "asdsadsadsad",
    });
    return charge
  }

}


