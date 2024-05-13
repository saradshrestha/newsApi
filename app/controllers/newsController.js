// controllers/newsController.js

const News = require("../../models/category");
const responseService = require("../../responseService/ResponseService");
const { json } = require("body-parser");
const { createSlug } = require("../../global/slugGenerator");
const { storeFile } = require("../../global/FileUploader");
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
      image_id: getFile ? getFile.id : "",
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
    const category = await News.findByPk(req.params.id);
    if(category === null) {
      return responseService.error(res,"News Not Found.", 404);
    }
    let getFile;
    const { title,description,status } = req.body;
    if (req.file) {
      if(category.image_id){
        getFile = await updateFile(category.image_id,req.file);
      }else{
        getFile = await storeFile(req.file);
      }
    }

    const categoryUpdate = await category.update({
      title: title,
      slug: createSlug(title),
      description: description,
      status: status,
      image_id: getFile ? getFile.id : ''
    });

    if (categoryUpdate) {
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
    const category = await News.findByPk(req.params.id);
    if(category === null) {
      return responseService.error(res,"News Not Found.", 404);
    }
    if(category.image_id != null){
      const file = await UploadFile.findByPk(category);
      await fs.unlink(path);
      await fs.unlink(resize_path);

      await file.delete();
    }
    const deleteNews = category.delete();
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
