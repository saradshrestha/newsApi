const {  getFilePath, getthumbnailPath, } = require("../../global/FileUploader");


async function allCategoryResource(categories) {
  try {
    const modifiedCategories = await Promise.all ( categories.map(async category => {
      const baseUrl = process.env.BASE_URL;
      let filePath = '';
      if(category.image_id != null){
        filePath = await getFilePath(category.image_id); 
        filePath = `${baseUrl}/${filePath}`;
      }
        return {
          title: category.title,
          slug: category.slug,
          status: category.status,
          description: category.description,
          imagePath: filePath
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