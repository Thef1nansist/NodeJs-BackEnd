const Router = require("express");
const router = new Router();
const deviceController = require("../controlles/deviceController");

router.post("/", deviceController.create);
router.post("/update", deviceController.update);
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);
router.get("/name/:name", deviceController.searchItem);
router.delete("/:id", deviceController.removeItem);

module.exports = router;
