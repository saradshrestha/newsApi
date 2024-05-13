const {  getFilePath, getthumbnailPath, } = require("../../global/FileUploader");


async function allCategoryResource(categories) {
  try {
    const modifiedCategories = await Promise.all (categories.map( async category => {
      const imagePath =category.image_id != null ? await getFilePath(category.image_id) : '' ; 
        return {
          title: category.title,
          slug: category.slug,
          status: category.status,
          description: category.description,
          imagePath: imagePath
        };
      }));
    return modifiedCategories;
  } catch (error) {
    throw error.message;
  }
}


module.exports = {
  allCategoryResource,
};