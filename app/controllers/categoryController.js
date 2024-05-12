// controllers/categoryController.js
const Category = require("../../models/category");
const responseService = require("../../responseService/ResponseService");
const { json } = require("body-parser");
const { createSlug } = require("../../global/slugGenerator");
const { storeFile } = require("../../global/FileUploader");
const UploadFile = require("../../models/uploadFile");


//Function - All Categories
exports.index = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes:['title','slug','status','description','image_id']
    });
    return responseService.success(res,categories, 'Successfully Fetched.', 200);
  } catch (error) {
    return responseService.error(res, error);
  }
};

//Function - Store Category
exports.store = async (req, res) => {
  try {
    const { title, description } = req.body;
    var getFile;
    if (req.file) {
      getFile = await storeFile(req.file);
    }
    const category = await Category.create({
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


//Function - Update Category
exports.update = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if(category === null) {
      return responseService.error(res,"Category Not Found.", 404);
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
        "Category successfully updated.",
        200
      );
    }
    return responseService.error(res, "Something Went Wrong.", 400);
  } catch (error) {
    return responseService.error(res, error.message,error.code);
  }
}

//Function - Delete Category
exports.delete = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if(category === null) {
      return responseService.error(res,"Category Not Found.", 404);
    }
    if(category.image_id != null){
      const file = await UploadFile.findByPk(category);
      await fs.unlink(path);
      await fs.unlink(resize_path);

      await file.delete();
    }
    const deleteCategory = category.delete();
    if(deleteCategory){
      return responseService.successMsg(
        res,
        "Category successfully deleted.",
        200
      );
    }
    return responseService.error(res, "Something Went Wrong.", 400);
  } catch (error) {
    console.log(error);
    return responseService.error(res, error.message, error.code);
  }
}
