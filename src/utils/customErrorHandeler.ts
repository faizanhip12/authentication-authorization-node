import { NextFunction, Request, Response } from 'express';

export class customError extends Error{
    statusCode: number;
    status: string;
    isOperational:boolean
    constructor(message,statusCode){
        super(message);
        this.statusCode =statusCode;
        this.status =statusCode >=400 && statusCode < 500 ? 'fail' :'error'
        this.isOperational =true

        Error.captureStackTrace(this,this.constructor)
    }

}