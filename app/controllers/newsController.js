// controllers/newsController.js
const responseService = require("../../responseService/ResponseService");
const { createSlug } = require("../../global/slugGenerator");
const { storeFile, updateFile, deleteFile } = require("../../global/FileUploader");
const { allNewsCollection } = require("../apiResource/newsResource");
const { News } = require('../../models/index');

const UploadFile = require("../../models/uploadFile");


//Function - All Categories
exports.index = async (req, res) => {
  try {
    const allNews = await News.findAll({
      include:'category'
      // [{
      //   model:Category,
      //   as:'category',
      //   attributes:['id','title','image_id','status']
      // }]
    });
    const resourceNews = await allNewsCollection(allNews);
    return responseService.success(res,resourceNews, 'Successfully Fetched.', 200);
  } catch (error) {
    return responseService.error(res, error);
  }
};

//Function - Store News
exports.store = async (req, res) => {
  try {
    const { title, description,category_id } = req.body;
    var getFile;
    if (req.file) {
      getFile = await storeFile(req.file);
    }
    const news = await News.create({
      title: title,
      slug: createSlug(title),
      description: description,
      feature_image: getFile ? getFile.id : "",
      category_id : category_id
    });
    if (news) {
      return responseService.success(
        res,
        news,
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
