import { CategoryRepository, CategoryModel } from './model'


import asyncHandler from '../../utils/async'

import * as bcrypt from 'bcrypt';

export class CategoryController {

  categoryModel = new CategoryRepository()

  constructor() { }


  create = asyncHandler(async (req: any, res: Response | any): Promise<Response | void> => {
    const { user, body } = req
    const category = await this.categoryModel.create(body)

    
    console.log("user", user)
    // this.apiResponse.successHandler("",{})
    res.status(200).send({
      success: true,
      message: 'success',
      data: category
    });

  });

  getAll = asyncHandler(async (req: any, res: Response | any): Promise<Response | void> => {
    const { user, body } = req
    const categories = await this.categoryModel.findMany()

    

    res.status(200).send({
      success: true,
      message: 'success',
      data: categories
    });

  });


}