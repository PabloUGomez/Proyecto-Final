const Logger = require("./Logger.js");
const Redis = require("ioredis");

const redis = new Redis();

function getDataFromCache(cacheKey, Model) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await redis.get(cacheKey);
      if (!data) {
        data = await Model.find();
        await redis.setex(cacheKey, 5, JSON.stringify(data));
        Logger.redisCacheSet(cacheKey);
        resolve(data);
        return;
      }
      resolve(JSON.parse(data));
    } catch (error) {
      Logger.error(error);
      reject(error);
    }
  });
}

function setDataInModel(cacheKey, Model, data) {
  return new Promise(async (resolve, reject) => {
    try {
      const newModel = new Model(data);
      await newModel.save();
      await redis.del(cacheKey);
      Logger.redisCacheRemove(cacheKey);
      Logger.mongoNewModel(Model.collection.collectionName, newModel._id);
      resolve(newModel);
    } catch (error) {
      Logger.error(error);
      reject(error);
    }
  });
}

module.exports = { getDataFromCache, setDataInModel };
