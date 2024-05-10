// controllers/categoryController.js
const Category = require("../../models/category");
const responseService = require("../../responseService/ResponseService");
const { json } = require("body-parser");
const { createSlug } = require("../../global/slugGenerator");
const { storeFile } = require("../../global/FileUploader");

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

exports.store = async (req, res) => {
  try {
    const { title, description } = req.body;
    let getFile;
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
};

exports.update = async (req, res) => {
  try {
    const category = await Project.findByPk(res.id);
    if (category === null) {
      console.log("Not found!");
      return responseService.error("Category Not Found.", 404);
    }
    const { title, description } = req.body;
    const slug = createSlug(title);
    const user = await Category.update({ title, slug: slug, description });
    if (user) {
      return responseService.success(
        res,
        user,
        "User successfully registered.",
        200
      );
    }
    return responseService.error(res, "Something Went Wrong.", 400);
  } catch (error) {
    console.error("Error in registerUser:", error); // Log the error
    return responseService.error(res, error);
  }
};

exports.delete = async (req, res) => {
  try {
    const { title, description } = req.body;
    const slug = createSlug(title);
    const user = await User.create({ title, slug: slug, description });
    if (user) {
      // await sendVerificationMail(user.email);
      return responseService.success(
        res,
        user,
        "User successfully registered.",
        200
      );
    }
    return responseService.error(res, "Something Went Wrong.", 400);
  } catch (error) {
    console.error("Error in registerUser:", error); // Log the error
    return responseService.error(res, error);
  }
};
