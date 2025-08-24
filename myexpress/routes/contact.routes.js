const express = require("express");
const {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
  searchContacts
} = require("../controllers/contact.controller");

const router = express.Router();

router.post("/", createContact);
router.get("/", getContacts);
router.get("/search", searchContacts);
router.get("/:id", getContactById);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;
