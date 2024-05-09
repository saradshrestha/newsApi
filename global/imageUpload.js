// multerConfig.js
const multer = require('multer');
const path = require('path'); // Import path module
const fs = require('fs'); // Import path module
const sharp = require('sharp'); 


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log(file,req,'storeage');
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');

        const uploadPath = `uploads/${year}/${month}`;

        fs.mkdirSync(uploadPath, { recursive: true });
        
        // console.log('uploadPath');

        this.uploadPath = uploadPath;
        cb(null, uploadPath);
      },
     
      filename: async (req, file, cb) => {
        const currentDate = new Date();
        console.log(file,'filename',this.uploadPath);
        const filename = file.originalname;
    
        try {
            if (file.mimetype.startsWith('image/jpg')) {
                const resizePath = path.join(this.uploadPath, 'resized');
                await sharp(file.path).resize({ width: 300, height: 300 }).toFile(path.join(resizePath, filename));
            }
            
            cb(null, filename);
        } catch (error) {
            console.error('Error processing image:', error);
            cb(error);
        }
    }
});

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(new Error('Only JPEG and PNG files are allowed!'), false);
//   }
// };

const upload = multer({ storage: storage });

module.exports = upload;