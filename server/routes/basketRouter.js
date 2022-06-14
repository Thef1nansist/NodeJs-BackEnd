const Router = require("express");
const router = new Router();
const basketController = require("../controlles/basketController");

router.post("/", basketController.create);
router.get("/:userId", basketController.getAllForUser);
router.delete("/:basketId", basketController.RemoveItem);
// router.get('/:id', basketController.getOne );

module.exports = router;
