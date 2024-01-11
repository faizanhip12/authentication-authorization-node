/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Router } from "express";
import { UserRoutes } from './module/auth/routes'
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import { UserController } from "./module/auth/controller";
import { ProductRoutes } from "./module/category/routes";
import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import { customError } from './utils/customErrorHandeler';
import expressPinoLogger from 'express-pino-logger'
import { logger } from './utils/logger'
import path from "path";
import pasport from './utils/oAuth'
import expressSession from 'express-session'
import { UserModel } from './module/auth/model'
import passport from 'passport'


config()


const app = express();
const loggerMidlleware = expressPinoLogger({
  logger: logger,
  autoLogging: true,
});
// const controller:UserController = new UserController()
// app.use(logger)



// app.use(loggerMidlleware);

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
app.use(passport.initialize());
app.use(expressSession({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));





//  const authRoutes = Router();
// authRoutes.post(
//   "/user","/user",controller.create


// );
// app.use(express.static(__dirname + '/public/'));
// app.use("/upload", express.static("src/upload"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req: Request, res: Response) => {
  console.log('Rendering app.ejs...');
  res.render('index');
});

passport.serializeUser((user: any, done) => {
  console.log("useruseruseruseruser",user)
  done(null, user._id);
});

passport.deserializeUser(async (_id: string, done) => {
  try {
    const user = await UserModel.findById(_id);
    console.log("deserializeUserdeserializeUserdeserializeUserdeserializeUserdeserializeUserdeserializeUser",user)
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
app.get('/auth/google', pasport.authenticate('google', { scope: ['profile', 'email'] }));
app.get(
  '/auth/google/callback',
  pasport.authenticate('google', { failureRedirect: '/' }),
  (req: Request | any, res: Response | any) => {
    // Create a JWT token and send it as a response
    console.log("")
    // const token = jwt.sign({ user: req.user }, 'your-secret-key', { expiresIn: '1h' });
    // res.cookie('token', token);
    res.redirect('/');
  }
);


// passport.serializeUser((user: any, done) => {
//   done(null, user.id);
// });

// // Deserialize user from the session
// passport.deserializeUser(async (id: string, done) => {
//   try {
//     const user = await UserModel.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });


// app.use("/api/v1", [
//   new UserRoutes().router,
//   new ProductRoutes().router
// ]);
// app.all('*', (req: Request, res:Response , next) => {
//   // res.status(400).json({
//   //   status: 'fail',
//   //   message: `cant't find ${req.orignalUrl} on the server`
//   // })
//   const err:any =new customError(`cant't find ${req.originalUrl} on the server`,404)
//   err.statusCode =404;
//   err.status ="fail"
//   next(err)
// })
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

// app.use((error: any, req: Request, res: Response , next: any) => {
//   error.statusCode = error.statusCode || 500
//   error.status =error.status || 'error'
//   res.status(error.statusCode).json({
//     status:error.statusCode,
//     message:error.message
//   })

// })



export default app;
