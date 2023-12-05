const Logger = require("./../utils/Logger.js");

function CheckAuthHeader(request, response, next) {
  const userId = request.headers["auth"];

  if (!userId) {
    Logger.routerWarnLog(
      request,
      "MIDDLEWARE",
      "AuthMiddleware.js",
      "CheckAuthHeader",
      "Encabezado Auth no existe"
    );
    response.status(400).json({ error: "Encabezado Auth no existe" });
    return;
  }

  next();
}
module.exports = { CheckAuthHeader };
