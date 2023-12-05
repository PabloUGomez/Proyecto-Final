const fontReset = "\x1b[0m";
const fontRed = "\x1b[31m";
const fontGreen = "\x1b[32m";
const fontYellow = "\x1b[33m";
const fontBlue = "\x1b[34m";
const fontMagenta = "\x1b[35m";
const fontCyan = "\x1b[36m";
const fontWhite = "\x1b[37m";
const fontBrightRed = "\x1b[91m";
const fontBrightGreen = "\x1b[92m";
const fontBrightYellow = "\x1b[93m";
const fontBrightBlue = "\x1b[94m";

class Logger {
  //https://en.m.wikipedia.org/wiki/ANSI_escape_code#Colors
  static log(...message) {
    console.log([message].join(" "), fontReset);
  }

  static serverStart(host, port) {
    this.log(`${fontGreen}Server start at ${fontYellow}${host}:${port}`);
  }
  static mongoStart(url) {
    this.log(`${fontGreen}MongoDB connected at ${fontYellow}${url}`);
  }

  //Dividores
  static dividerMagenta() {
    this.log(`${fontMagenta}${Array(process.stdout.columns ?? 30).join("=")}`);
  }
  static dividerRed() {
    this.log(`${fontRed}${Array(process.stdout.columns ?? 30).join("=")}`);
  }
  static dividerCyan() {
    this.log(`${fontCyan}${Array(process.stdout.columns ?? 30).join("-")}`);
  }

  static routerLog(req, method, controllerName, functionName) {
    this.dividerCyan();
    this.log(
      `${fontBrightBlue}[${method}] ${fontCyan}${req.originalUrl}${fontBrightBlue} => ${fontCyan}${controllerName}${fontBrightBlue}.${fontCyan}${functionName}()`
    );
  }

  static routerWarnLog(req, method, controllerName, functionName, message) {
    this.dividerCyan();
    this.log(
      `${fontBrightYellow}[${method}] ${fontYellow}${req.originalUrl}${fontBrightYellow} => ${fontYellow}${controllerName}${fontBrightBlue}.${fontYellow}${functionName}(): ${fontWhite}${message}`
    );
  }

  static mongoNewModel(modelName, newModelId) {
    this.log(
      `${fontBrightGreen}MongoDB ${fontWhite}new document ${fontBrightGreen}created${fontWhite} from model: ${fontYellow}${modelName}${fontWhite}, with ID: ${fontYellow}${newModelId}`
    );
  }
  static mongoUpdatedModel(modelName, newModelId) {
    this.log(
      `${fontBrightGreen}MongoDB ${fontWhite}document ${fontBrightYellow}updated${fontWhite} from model: ${fontYellow}${modelName}${fontWhite}, with ID: ${fontYellow}${newModelId}`
    );
  }
  static mongoDeletedModel(modelName, newModelId) {
    this.log(
      `${fontBrightGreen}MongoDB ${fontWhite}document ${fontBrightRed}deleted${fontWhite} from model: ${fontYellow}${modelName}${fontWhite}, with ID: ${fontYellow}${newModelId}`
    );
  }

  static redisCacheSet(cacheKey) {
    this.log(
      `${fontRed}Redis ${fontWhite}cache setted with key name: ${fontYellow}${cacheKey}`
    );
  }

  static redisCacheSet(cacheKey) {
    this.log(
      `${fontRed}Redis ${fontWhite}cache setted with key name: ${fontYellow}${cacheKey}`
    );
  }
  static redisCacheRemove(cacheKey) {
    this.log(
      `${fontRed}Redis ${fontWhite}cache deleted with key name: ${fontYellow}${cacheKey}`
    );
  }

  static error(error) {
    this.dividerRed();
    this.log(`${fontBrightRed}Error!!!`);
    this.log(`${fontBrightRed}Name: ${fontBrightGreen}${error.name}`);
    this.log(`${fontBrightRed}Message: ${fontBrightGreen}${error.message}`);
    this.dividerRed();
    this.log(`${fontRed}Where Append: \n${fontBrightYellow}${error.stack}`);
    this.dividerRed();
  }
}

module.exports = Logger;
