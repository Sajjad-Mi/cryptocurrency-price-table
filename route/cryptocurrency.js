const {Router} = require("express");
const router = Router();
const tableControllers = require("../controllers/tableControllers");

router.get("/table", tableControllers.table_get);
router.get("/table/update", tableControllers.tableUpdate_get)
router.get("/table/add/:sym", tableControllers.tableAdd_get)
module.exports = router;