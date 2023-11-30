//Env
require("dotenv").config();
const env = process.env;

const Logger = require("./Logger.js");
const Redis = require("ioredis");

const redis = new Redis(env.REDIS_HOST);

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
/**
 *
 * @param {String} cacheKey
 * @param {MongoModel} Model
 * @param {{searchField, otherSearchField}} search
 * @param {{fields, othersFields }} updateFields
 * @returns
 */
function updateDataInModel(cacheKey, Model, search, updateFields) {
  return new Promise(async (resolve, reject) => {
    try {
      await redis.del(cacheKey);
      Logger.redisCacheRemove(cacheKey);

      const updatedModel = await Model.findOneAndUpdate(search, updateFields, {
        new: true,
      });

      Logger.mongoUpdatedModel(
        Model.collection.collectionName,
        updatedModel._id
      );
      resolve(updatedModel);
    } catch (error) {
      Logger.error(error);
      reject(error);
    }
  });
}

function deleteDocumentInModel(cacheKey, Model, search) {
  return new Promise(async (resolve, reject) => {
    try {
      await redis.del(cacheKey);
      Logger.redisCacheRemove(cacheKey);

      const deletedModel = await Model.deleteOne(search);

      Logger.mongoDeletedModel(
        Model.collection.collectionName,
        deletedModel._id ?? -1
      );
      resolve(deletedModel);
    } catch (error) {
      Logger.error(error);
      reject(error);
    }
  });
}

module.exports = {
  getDataFromCache,
  setDataInModel,
  updateDataInModel,
  deleteDocumentInModel,
};
