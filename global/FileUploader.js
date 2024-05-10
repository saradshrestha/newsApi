

const UploadFile = require('../models/uploadFile');

async function storeFile(file) {
  try {
    const {filename, path, mimetype, size} = file;
    const uploadFile =  await UploadFile.create({ filename, path, resize_path:path,ext:mimetype });
    return uploadFile;
  }catch(error){
    throw error; 
  }
}

module.exports = {storeFile};