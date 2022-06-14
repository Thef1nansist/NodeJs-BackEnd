const Router = require("express");
const router = new Router();
const brandController = require("../controlles/brandController");

router.post("/", brandController.create);
router.get("/", brandController.getAll);
router.delete("/:id", brandController.removeItem);

module.exports = router;
