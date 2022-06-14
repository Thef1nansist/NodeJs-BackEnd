const jwt = require("jsonwebtoken");

module.exports = function (role) {
  return function (req, resp, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return resp.status(401).json({ message: "Не авторизован" });
      }

      const decode = jwt.verify(token, process.env.SECRET_KEY);
      if (decode.role != role) {
        
        return resp
          .status(403)
          .json({ message: "Не хватает полномочий для этой операции" });
      }
      req.user = decode;
      next();
    } catch (e) {
      resp.status(401).json({ message: "Не авторизован" });
    }
  };
};
