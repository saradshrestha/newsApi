// controllers/newsController.js

const News = require("../../models/news");
const responseService = require("../../responseService/ResponseService");
const { json } = require("body-parser");
const { createSlug } = require("../../global/slugGenerator");
const { storeFile, updateFile, deleteFile } = require("../../global/FileUploader");
const UploadFile = require("../../models/uploadFile");


//Function - All Categories
exports.index = async (req, res) => {
  try {
    const categories = await News.findAll({
      attributes:['title','slug','status','description','feature_image']
    });
    
    return responseService.success(res,categories, 'Successfully Fetched.', 200);
  } catch (error) {
    return responseService.error(res, error);
  }
};

//Function - Store News
exports.store = async (req, res) => {
  try {
    const { title, description } = req.body;
    var getFile;
    if (req.file) {
      getFile = await storeFile(req.file);
    }
    const category = await News.create({
      title: title,
      slug: createSlug(title),
      description: description,
      feature_image: getFile ? getFile.id : "",
    });
    if (category) {
      return responseService.success(
        res,
        category,
        "News Successfully Saved.",
        200
      );
    }
    return responseService.error(res, "Something Went Wrong.", 400);
  } catch (error) {
    return responseService.error(res, error.message);
  }
}


//Function - Update News
exports.update = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if(news === null) {
      return responseService.error(res,"News Not Found.", 404);
    }
    let getFile;
    const { title,description,status } = req.body;
    if (req.file) {
      if(news.feature_image){
        getFile = await updateFile(news.feature_image,req.file);
      }else{
        getFile = await storeFile(req.file);
      }
    }

    const newsUpdate = await news.update({
      title: title,
      slug: createSlug(title),
      description: description,
      status: status,
      feature_image: getFile ? getFile.id : ''
    });

    if (newsUpdate) {
      return responseService.successMsg(
        res,
        "News successfully updated.",
        200
      );
    }
    return responseService.error(res, "Something Went Wrong.", 400);
  } catch (error) {
    return responseService.error(res, error.message,error.code);
  }
}

//Function - Delete News
exports.delete = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if(news === null) {
      return responseService.error(res,"News Not Found.", 404);
    }
    if(news.feature_image != null){
      const file = await deleteFile(news.feature_image);
      // const file = await UploadFile.findByPk(news.feature_image);
      // await fs.unlink(path);
      // await fs.unlink(resize_path);
      // await file.delete();
    }
    const deleteNews = news.delete();
    if(deleteNews){
      return responseService.successMsg(
        res,
        "News successfully deleted.",
        200
      );
    }
    return responseService.error(res, "Something Went Wrong.", 400);
  } catch (error) {
    console.log(error);
    return responseService.error(res, error.message, error.code);
  }
}
