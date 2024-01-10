import { ProductRepository, ProductModel } from './model'
import asyncHandler from '../../utils/async';
import { NextFunction, Request, Response,ErrorRequestHandler } from 'express';
import * as bcrypt from 'bcrypt';

export class ProductController {
  productModel = new ProductRepository()
  constructor() { }

 
  create = asyncHandler(async (req: any, res: Response | any): Promise<Response | void> => {
    const { user, body } = req

 
    const product = await this.productModel.create(body)

    
    console.log("user", user)
    // this.apiResponse.successHandler("",{})
    res.status(200).send({
      success: true,
      message: 'success',
      data: product
    });

  });

  getAll = asyncHandler(async (req: any, res: Response | any): Promise<Response | void> => {
    const { user, body } = req
    const products = await this.productModel.findMany()

    

    res.status(200).send({
      success: true,
      message: 'success',
      data: products
    });

  });









}