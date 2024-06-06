const {  getFilePath, getthumbnailPath, } = require("../../global/FileUploader");

async function allFileUploadCollection(uploadFiles) {
  try {
    const modifiedCategories = await Promise.all ( uploadFiles.map(async uploadFile => {
      const baseUrl = process.env.BASE_URL;
      filePath = uploadFile.path;
      filePath = `${baseUrl}/${filePath}`;
      resizeFilePath = uploadFile.resize_path; 
      resizeFilePath = `${baseUrl}/${resizeFilePath}`;

      return {
        id: uploadFile.id,
        resizeFilePath:resizeFilePath,
        imagePath: filePath
      };
    }));
    return modifiedCategories;
  } catch (error) {
    throw error.message;
  }
}


async function fileUploadResource(uploadFile) {
  try {
    
    const baseUrl = process.env.BASE_URL;
    filePath = uploadFile.path; 
    resizeFilePath = uploadFile.resize_path; 

    filePath = `${baseUrl}/${filePath}`;
    resizeFilePath = `${baseUrl}/${resizeFilePath}`;

    
    modifiedCategory =  {
      id: uploadFile.id,
      resizeFilePath:resizeFilePath,
      imagePath: filePath,
    };
    return modifiedCategory;
  } catch (error) {
    throw error.message;
  }
}

module.exports = {allFileUploadCollection,fileUploadResource};