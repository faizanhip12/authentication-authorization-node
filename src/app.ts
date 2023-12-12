/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
config()


const app = express();


app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(
  cors({
    credentials: true,
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);


app.use(express.static(__dirname + '/public/'));
app.use("/upload", express.static("src/upload"));

// app.use("/api/v1", [

// ]);



app.use((err: any, res: any) => {
  console.log("err.message",err.message )
  res.status(500).send({ message: err.message || "Network Error" })
})


export default app;