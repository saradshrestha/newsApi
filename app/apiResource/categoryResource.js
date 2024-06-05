const {  getFilePath, getthumbnailPath, } = require("../../global/FileUploader");


async function allCategoryCollection(categories) {
  try {
    console.log(categories);
    const modifiedCategories = await Promise.all ( categories.map(async category => {
      const baseUrl = process.env.BASE_URL;
      let filePath = '';
      if(category.image_id != null){
        filePath = await getFilePath(category.image_id); 
        filePath = `${baseUrl}/${filePath}`;
      }
        return {
          id: category.id,
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


async function categoryResource(category) {
  try {
  
    const baseUrl = process.env.BASE_URL;
    let filePath = '';

      if(category.image_id != null){
        filePath = await getFilePath(category.image_id); 
        filePath = `${baseUrl}/${filePath}`;
      }
      modifiedCategory =  {
        id: category.id,
        title: category.title,
        slug: category.slug,
        // status: category.status,
        description: category.description,
        imagePath: filePath
      };
      
      // console.log(modifiedCategory,'from Category Resource');
    return modifiedCategory;
  } catch (error) {
    throw error.message;
  }
}

module.exports = {allCategoryCollection,categoryResource};