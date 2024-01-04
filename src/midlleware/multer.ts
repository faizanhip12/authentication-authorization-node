import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the destination folder for uploaded files
      cb(null, '../uploads');
    },
    filename: function (req, file, cb) {
      // Specify the filename for uploaded files
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  export const upload = multer({ storage: storage });