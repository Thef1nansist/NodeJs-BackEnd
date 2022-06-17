const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

exports.registration = async function (req, resp) {
  const { email, password, role } = req.body;
  console.log(email);
  console.log(password);
  if (!email || !password) {
    return next(ApiError.badRequest("Некорректный email или password"));
  }
  const candidate = await User.findOne({ where: { email } });
  if (candidate) {
    return next(
      ApiError.badRequest("Пользователь с таким email уже существует")
    );
  }
  const hashPassword = await bcrypt.hash(password, 5);
  const user = await User.create({ email, role, password: hashPassword });
  const basket = await Basket.create({ userId: user.id });
  const token = generateJwt(user.id, user.email, user.role);
  return resp.json({ token });
};

exports.login = async function (req, resp) {
  const { email, password } = req.body;
  console.log(email);
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return next(ApiError.internal("Пользователь не найден"));
  }
  let comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    return next(ApiError.internal("Указан неверный пароль"));
  }
  const token = generateJwt(user.id, user.email, user.role);
  return resp.json({ token });
};

exports.check = function (req, resp, next) {
  const token = generateJwt(req.user.id, req.user.email, req.user.role);
  return resp.json({ token });
};
