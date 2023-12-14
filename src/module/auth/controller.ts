import { UserRepository, UserModel } from './model'
import {generateToken} from '../../utils/token'

import asyncHandler from '../../utils/async'
import * as bcrypt from 'bcrypt';

export class UserController {
  user = new UserRepository()
  constructor() { }

  signup = asyncHandler(async (req: any, res: Response | any): Promise<Response | void> => {

    // console.log("user",req.body)
    try {
      console.log("try")
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
        const user = await this.user.create(req.body)
     
        // console.log("generateToke",generateToke.username )

        console.log("user", user)
        res.status(200).send({
          success: true,
          message: 'success',
          data: user,
          token:generateToke 
        });
      }

    }
    catch (err) {
      res.status(403).send("bad request")
    }
  });

  signin = asyncHandler(async (req: any, res: Response | any): Promise<Response | void> => {

    // console.log("user",req.body)
    try {
      console.log("try")
      const findUser = await this.user.findOne({ username: req.body.username })
      console.log("findUser", findUser)
      if (findUser) {

        const isMatch = await bcrypt.compare(req.body.password, findUser.password);
        if(isMatch)
        {
          const generateToke = generateToken(req.body.username)
          res.status(200).send({
            success: true,
            message: 'success',
            data: findUser,
            generateToke
          });
        }
        else{
          res.status(403).send("bad request")
        }
       
      }
      else {
        res.status(403).send("user is not found with that credentials")
      }

    }
    catch (err) {
      res.status(403).send("bad request")
    }
  });

  







}