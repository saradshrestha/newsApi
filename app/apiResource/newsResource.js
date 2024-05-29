const {  getFilePath, getthumbnailPath, } = require("../../global/FileUploader");
const {  allCategoryCollection,categoryResource } = require("../apiResource/categoryResource");



async function allNewsCollection(allNews) {
  try {
    const modifiedNews = await Promise.all ( allNews.map(async news => {
      const baseUrl = process.env.BASE_URL;
      let filePath = null;
      if(news.feature_image != null){
        featureImagePath = await getFilePath(news.feature_image); 
        featureImagePath = `${baseUrl}/${featureImagePath}`;
      }
     
        return {
          id: news.id,
          title: news.title,
          slug: news.slug,
          status: news.status,
          description: news.description,
          // category: news.category_id,
          feature_image_path: featureImagePath,
          category: await categoryResource(news.category)
        };
      }));
    return modifiedNews;
  } catch (error) {
    throw error.message;
  }
}


module.exports = {
  allNewsCollection,
};