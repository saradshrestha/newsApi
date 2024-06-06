/* FileUpload.js
    Used for file/image upload to the node system with specific path 
*/
const multer = require('multer');
const path = require('path'); 
const fs = require('fs'); 
const sharp = require('sharp'); //used for resize image


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');

        const uploadPath = `uploads/${year}/${month}`;

        fs.mkdirSync(uploadPath, { recursive: true });

        this.uploadPath = uploadPath;
        cb(null, uploadPath);
      },
     
      filename: async (req, file, cb) => {
        const currentDate = new Date();
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