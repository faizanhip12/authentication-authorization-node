import { UserRepository, UserModel } from './model'
import { generateToken, refreshToken } from '../../utils/token'

import asyncHandler from '../../utils/async'
import * as bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import { ApiResponse } from '../../core/response'
import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import { logger } from '../../utils/logger'
// import {logger} from '../../utils/pinoHTTP'


export class UserController {
  apiResponse = new ApiResponse()
  user = new UserRepository()
  constructor() { }

  signup = asyncHandler(async (req: Request, res: Response): Promise<Response | void> => {

    // console.log("user", req.body)


    const findUser = await this.user.findOne({ username: req.body.username })
    console.log("findUser", findUser)

    if (findUser) {
      res.status(403).send("user alredy exits")
    }
    else {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      const generateToke = generateToken(req.body.username)
      const refreshToke = refreshToken(req.body.username)
      req.body.refreshToken = refreshToke
      const user = await this.user.create(req.body)

      // console.log("generateToke",generateToke.username )

      console.log("user", user)
      // this.apiResponse.successHandler("",{})
      res.status(200).send({
        success: true,
        message: 'success',
        data: user,
        token: generateToke,
        refreshToken: refreshToke
      });
    }



  });

  signin = asyncHandler(async (req: Request, res: Response | any): Promise<Response | void> => {

    // console.log("user",req.body)

    console.log("try")
    // logger.http('sign in route')


    logger.info(req, 'sign in route')
    // logger.debug('sign in route')
    // logger.warn('sign in route')
    // logger.fatal('sign in route)

    const findUser = await this.user.findOne({ username: req.body.username})

    // console.log("findUser", findUser)
    if (findUser) {

      const isMatch = await bcrypt.compare(req.body.password, findUser.password);
      if (isMatch) {
        const generateToke = generateToken(req.body.username)
        const refreshToke = refreshToken(req.body.username)

        const updatedUser = await this.user.findOneAndUpdate({ _id: findUser._id }, { refreshToken: refreshToke })
        // updatedUser.accessToken = generateToke
        // updatedUser.refreshToken = generateToke
        console.log("updatedUser",updatedUser)
        const fullData ={...updatedUser.toObject(),accessToken:generateToke,refreshToken:refreshToke}
        console.log("fullData",fullData)
        res.status(200).send({
          success: true,
          message: 'success',
          // data:{...updatedUser,accessToken:generateToke,refreshToken:refreshToke},
          data:fullData,
          // generateToke,
          // refreshToken: refreshToke
        });
      }
      else {
        res.status(403).send("bad request")
      }

    }
    else {
      res.status(403).send("user is not found with that credentials")
    }


  });


  upload = asyncHandler(async (req: Request, res: Response): Promise<Response | void> => {

    // console.log("user",req.body)

    // console.log("try")
    // console.log(req.imageUrl);
    // res.send('File uploaded successfully!').status(200);

    let imageUrl = ''
    cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error: any, result: any) => {
        if (error) {
          return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
        }

        // Send the public URL of the uploaded image back to the client
        res.json({ imageUrl: result.secure_url });
        imageUrl = result.secure_url
        console.log("{ imageUrl: result.secure_url }", { imageUrl: result.secure_url })
      }
    ).end(req.file.buffer);
    // res.json({ imageUrl: await imageUrl });
    // res.status(200).send("bad request",{ imageUrl: imageUrl })



  });


  refreshToken = asyncHandler(async (req: Request, res: Response | any): Promise<Response | void> => {
    console.log("refrseh token")
    const { refreshToken } = req.body;
    const findUser = await this.user.findOne({ refreshToken: refreshToken})

    if(!findUser){
      return res.status(403).send("user is not found with that credentials")
    }

    const generateToke = generateToken(findUser.username)
    console.log("generateToke refreshToken",generateToke)

    res.status(200).send({
      success: true,
      message: 'success',
      data:{accessToken: generateToke},
    });
    

  });


}