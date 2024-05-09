const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

class FileUploader {
  constructor() {
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        console.log(file,req,'storeage');
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        // const day = String(currentDate.getDate()).padStart(2, '0');

        const uploadPath = `uploads/${year}/${month}`;

        fs.mkdirSync(uploadPath, { recursive: true });
        
        console.log('uploadPath');

        this.uploadPath = uploadPath;
        cb(null, uploadPath);
      },
     
      filename: (req, file, cb) => {
          console.log('filename');
          cb(null,file.originalname);
        },
      });
  
    this.upload = multer({ storage: this.storage });
  }

  multiple(fieldName, maxCount) {
    return this.upload.array(fieldName, maxCount);
  }

  single(fieldName) {
    return this.upload.single(fieldName);
  }
}

module.exports = FileUploader;
