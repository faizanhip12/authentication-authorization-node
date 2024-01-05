import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary';
          


const app = express();
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'doj1xianv',
  api_key: '738798569757755',
  api_secret: 'aSJlYbItPfo90M764kNk3FDMsfM',
});


