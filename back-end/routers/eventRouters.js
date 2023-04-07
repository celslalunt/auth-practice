const router = require ("express").Router();
const {eventControllers} = require("../controllers");

router.post("/create",eventControllers.addEvent);
router.get("/show",eventControllers.showEvents);

module.exports = router;

