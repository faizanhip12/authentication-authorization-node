import {UserRepository,UserModel} from './model'
import asyncHandler from '../../utils/async'

export class UserController {
     user = new UserRepository()
    constructor(){}

  create =  asyncHandler(async (req: any, res: Response |any): Promise<Response | void> => {

    // console.log("user",req.body)
   try{
    console.log("try")
    const findUser =await this.user.findOne({username:req.body.username})
    console.log("findUser",findUser)
    if(findUser)
    {
        res.status(403).send("user alredy exits")
    }
    else{
   const user = await this.user.create(req.body)
   console.log("user",user)
   res.status(200).send({
    success: true,
    message: 'success',
    data: user,
  });
    }

   }
   catch(err){
    res.status(403).send("bad request")
   }
  });
    


  }