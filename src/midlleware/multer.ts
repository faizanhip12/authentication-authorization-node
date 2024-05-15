import multer from 'multer';
import * as path from 'path';
// import {} from '../../src/uploads'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the destination folder for uploaded files
      const destinationPath = path.join(__dirname, '../../src/uploads');
      console.log("destinationPathdestinationPathdestinationPathdestinationPathdestinationPath",destinationPath)
      cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
      // Specify the filename for uploaded files
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  export const uploadFile = multer({ storage: storage });