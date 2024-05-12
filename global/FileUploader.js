//FileUploder.js

const UploadFile = require('../models/uploadFile');
const fs = require('fs');

async function storeFile(file) {
  try {
    const {filename, path, mimetype, size} = file;
    const uploadFile =  await UploadFile.create({ filename, path, resize_path:path,ext:mimetype });
    return uploadFile;
  }catch(error){
    throw error; 
  }
}

async function updateFile(file_id,file) {
  try {
    const getFile = await UploadFile.findByPk(file_id);
    if(getFile){
      const {filename, path, mimetype, size} = file;
      const fileUpdate = await getFile.update({
        filename: filename,
        path: path,
        resize_path: path,
        ext: mimetype
      });
      return true;
    }
    return true; // For testing
    throw error('File not found');
  }catch(error){
    throw error;  
  }
}



async function deleteFile(file_id) {
  try {
    const getFile = await UploadFile.findByPk(file_id);
    if(getFile){
      await fs.unlink(getFile.path);
      if(getFile.resize_path){
        await fs.unlink(getFile.resize_path);
      }
      await getFile.delete();
      return true;
    }
    return true; // For testing
    throw error('FIle not found');
  }catch(error){
    throw error; 
  }
}

module.exports = { storeFile,updateFile,deleteFile };