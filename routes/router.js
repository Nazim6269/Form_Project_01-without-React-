const router = require("express").Router();
const {
  getAllContacts,
  getSingleContacts,
  createContacts,
  updateContacts,
  deleteContacts,
} = require("../controllers/controller");

router.get("/", getAllContacts);
router.get("/delete/:id", deleteContacts); //you can check it in search bar by existing id in mongoDB
router.get("/:id", getSingleContacts); //you can check it in search bar by existing id in mongoDB
router.put("/:id", updateContacts);
router.post("/", createContacts);

module.exports = router;
