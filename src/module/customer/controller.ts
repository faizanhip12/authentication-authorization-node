import { UserRepository, CustomerModel } from './model'
import { generateToken, refreshToken } from '../../utils/token'

import asyncHandler from '../../utils/async'
import * as bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import { ApiResponse } from '../../core/response'
import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import { logger } from '../../utils/logger';
import { StripeService } from '../../service/stripe'
const path = require('path');



export class UserController {
  apiResponse = new ApiResponse()
  user = new UserRepository()
  stripe = new StripeService()
  constructor() { }

  createCustomer = asyncHandler(async (req: Request, res: Response): Promise<Response | void> => {



    console.log("user", req.file)


    const findUser = await this.user.findOne({ email: req.body.email })
    console.log("findUser", findUser)

    if (findUser) {
      res.status(403).send("user alredy exits")
    }
    else {
      // const saltRounds = 10;
      // const salt = await bcrypt.genSalt(saltRounds);
      // req.body.password = await bcrypt.hash(req.body.password, salt);
      // const generateToke = generateToken(req.body.email)
      // const refreshToke = refreshToken(req.body.email)
      // req.body.refreshToken = refreshToke
      // const createStripeCustomer = await this.stripe.createCustomer({email:req.body.email,name:req.body.username})
      // const createStripeAccount = await this.stripe.createAccount(req.body.email)

      // console.log("createStripeCustomer",createStripeCustomer.id)
      // console.log("createStripeAccount",createStripeAccount.id)
      // req.body.stripe_customerId = createStripeCustomer.id
      // req.body.stripe_accountId =createStripeAccount.id

      //   let imageUrl = ''
      //   console.log("req.file.path",req.file)
      //   //@ts-ignore
      //   const result = await cloudinary.uploader.upload(req.file.buffer, {
      //     resource_type: 'image'
      //   });
      //   imageUrl = result.secure_url;

      //   req.body.imageUrl = imageUrl

      console.log("imageUrl", req.file)
      const imageUrl = `http://localhost:<span class="math-inline">\{process\.env\.PORT\}/uploads/</span>{filePath.split('/').pop()}`;
      console.log("imageUrl", imageUrl)
      const user = await this.user.create({
        userName: req.body.email,
        customerName: req.body.customerName,
        email: req.body.email,
        imageUrl: '/uploads/' + req.file?.filename

      })



      console.log("user", user)
      // this.apiResponse.successHandler("",{})
      res.status(200).send({
        success: true,
        message: 'success',
        data: { ...user.toObject() },

      });
    }



  });

  // signin = asyncHandler(async (req: Request, res: Response | any): Promise<Response | void> => {

  //   // console.log("user",req.body)

  //   console.log("try")
  //   // logger.http('sign in route')


  //   logger.info(req, 'sign in route')
  //   // logger.debug('sign in route')
  //   // logger.warn('sign in route')
  //   // logger.fatal('sign in route)

  //   const findUser = await this.user.findOne({ email: req.body.email})

  //   // console.log("findUser", findUser)
  //   if (findUser) {

  //     const isMatch = await bcrypt.compare(req.body.password, findUser.password);
  //     if (isMatch) {
  //       const generateToke = generateToken(req.body.email)
  //       const refreshToke = refreshToken(req.body.email)

  //       const updatedUser = await this.user.findOneAndUpdate({ _id: findUser._id }, { refreshToken: refreshToke })
  //       // updatedUser.accessToken = generateToke
  //       // updatedUser.refreshToken = generateToke
  //       console.log("updatedUser",updatedUser)
  //       const fullData ={...updatedUser.toObject(),accessToken:generateToke,refreshToken:refreshToke}
  //       console.log("fullData",fullData)
  //       res.status(200).send({
  //         success: true,
  //         message: 'success',
  //         // data:{...updatedUser,accessToken:generateToke,refreshToken:refreshToke},
  //         data:fullData,
  //         // generateToke,
  //         // refreshToken: refreshToke
  //       });
  //     }
  //     else {
  //       res.status(403).send("bad request")
  //     }

  //   }
  //   else {
  //     res.status(403).send("user is not found with that credentials")
  //   }


  // });


  // upload = asyncHandler(async (req: Request, res: Response): Promise<Response | void> => {

  //   // console.log("user",req.body)

  //   // console.log("try")
  //   // console.log(req.imageUrl);
  //   // res.send('File uploaded successfully!').status(200);

  //   let imageUrl = ''
  //   cloudinary.uploader.upload_stream(
  //     { resource_type: 'image' },
  //     (error: any, result: any) => {
  //       if (error) {
  //         return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
  //       }

  //       // Send the public URL of the uploaded image back to the client
  //       res.json({ imageUrl: result.secure_url });
  //       imageUrl = result.secure_url
  //       console.log("{ imageUrl: result.secure_url }", { imageUrl: result.secure_url })
  //     }
  //   ).end(req.file.buffer);
  //   // res.json({ imageUrl: await imageUrl });
  //   // res.status(200).send("bad request",{ imageUrl: imageUrl })



  // });


  // upload = asyncHandler(async (req: Request, res: Response): Promise<Response | void> => {

  //   // console.log("user",req.body)

  //   // console.log("try")
  //   // console.log(req.imageUrl);
  //   // res.send('File uploaded successfully!').status(200);

  //   let imageUrl = ''
  //   cloudinary.uploader.upload_stream(
  //     { resource_type: 'image' },
  //     (error: any, result: any) => {
  //       if (error) {
  //         return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
  //       }

  //       // Send the public URL of the uploaded image back to the client
  //       res.json({ imageUrl: result.secure_url });
  //       imageUrl = result.secure_url
  //       console.log("{ imageUrl: result.secure_url }", { imageUrl: result.secure_url })
  //     }
  //   ).end(req.file.buffer);
  //   // res.json({ imageUrl: await imageUrl });
  //   // res.status(200).send("bad request",{ imageUrl: imageUrl })



  // });


  // upload = asyncHandler(async (req: Request, res: Response): Promise<Response | void> => {


  //   let imageUrl = ''
  //   cloudinary.uploader.upload_stream(
  //     { resource_type: 'image' },
  //     (error: any, result: any) => {
  //       if (error) {
  //         return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
  //       }

  //       // Send the public URL of the uploaded image back to the client
  //       res.json({ imageUrl: result.secure_url });
  //       imageUrl = result.secure_url
  //       console.log("{ imageUrl: result.secure_url }", { imageUrl: result.secure_url })
  //     }
  //   ).end(req.file.buffer);
  //   // res.json({ imageUrl: await imageUrl });
  //   // res.status(200).send("bad request",{ imageUrl: imageUrl })



  // });

  getAllCustomers = asyncHandler(async (req: Request, res: Response): Promise<Response | void> => {


    const findUser = await this.user.findMany()

    console.log("findUser",findUser)

    res.status(200).send({
      success: true,
      message: 'success',
      data: {...findUser  },

    });


  });


  // refreshToken = asyncHandler(async (req: Request, res: Response | any): Promise<Response | void> => {
  //   console.log("refrseh token")
  //   const { refreshToken } = req.body;
  //   const findUser = await this.user.findOne({ refreshToken: refreshToken})

  //   if(!findUser){
  //     return res.status(403).send("user is not found with that credentials")
  //   }

  //   const generateToke = generateToken(findUser.username)
  //   console.log("generateToke refreshToken",generateToke)

  //   res.status(200).send({
  //     success: true,
  //     message: 'success',
  //     data:{accessToken: generateToke},
  //   });


  // });


}