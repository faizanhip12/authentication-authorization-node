/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Router } from "express";
import { UserRoutes } from './module/auth/routes'
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import { UserController } from "./module/auth/controller";
import { ProductRoutes } from "./module/product/routes";
import { NextFunction, Request, Response,ErrorRequestHandler } from 'express';
import {customError} from './utils/customErrorHandeler';

config()


const app = express();
// const controller:UserController = new UserController()

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

app.use(
  cors({
    credentials: true,
  })
);


//  const authRoutes = Router();
// authRoutes.post(
//   "/user","/user",controller.create


// );
// app.use(express.static(__dirname + '/public/'));
// app.use("/upload", express.static("src/upload"));

app.use("/api/v1", [
  new UserRoutes().router,
  new ProductRoutes().router
]);
app.all('*', (req: Request, res:Response , next) => {
  // res.status(400).json({
  //   status: 'fail',
  //   message: `cant't find ${req.orignalUrl} on the server`
  // })
  const err:any =new customError(`cant't find ${req.originalUrl} on the server`,404)
  err.statusCode =404;
  err.status ="fail"
  next(err)
})
// app.get('/api/data', async (req:any, res:any) => {
//   try {
//     // Make a GET request to an external API (replace with your API endpoint)
//     // const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
//     // const data = response.data;

//     // res.json(data);
//     res.status(403).send("nasaruallah")
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });





// app.use((err: any, res: any) => {
//   console.log("err.message",err.message )
//   res.status(500).send({ message: err.message || "Network Error" })
// })

app.use((error: any, req: Request, res: Response , next: any) => {
  error.statusCode = error.statusCode || 500
  error.status =error.status || 'error'
  res.status(error.statusCode).json({
    status:error.statusCode,
    message:error.message
  })

})



export default app;
