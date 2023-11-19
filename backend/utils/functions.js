const Logger = require("./Logger.js");
const Redis = require("ioredis");

const redis = new Redis();

function getDataFromCache(cacheKey, mongoModel) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await redis.get(cacheKey);
      if (!data) {
        data = await mongoModel.find();
        await redis.setex(cacheKey, 5, JSON.stringify(data));
        Logger.redisCacheSet(cacheKey);
      }
      resolve(JSON.parse(JSON.stringify(data)));
    } catch (error) {
      Logger.error(error);
      reject(error);
    }
  });
}

module.exports = { getDataFromCache };
