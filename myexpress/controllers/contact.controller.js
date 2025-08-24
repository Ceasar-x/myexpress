const Contact = require("../models/Contact.model");

async function createContact(req, res) {
  try {
    const { name, email, phone } = req.body;
    const newContact = new Contact({ name, email, phone });
    await newContact.save();
    res.status(201).json({ message: "Contact created", newContact });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getContacts(req, res) {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getContactById(req, res) {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateContact(req, res) {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact updated", updated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteContact(req, res) {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function searchContacts(req, res) {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: "Please provide a search term" });
    }

    const contacts = await Contact.find({
      name: new RegExp(name, "i"),
    });

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
  searchContacts,
};
