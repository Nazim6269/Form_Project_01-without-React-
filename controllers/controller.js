//const { json } = require("express");
const Contact = require("../models/contact.model");

const getAllContacts = (req, res) => {
  Contact.find()
    .then((contacts) => {
      //console.log(contacts)
      res.render("../views/index.ejs", { contacts, error: {} });
    })
    .catch((error) => {
      console.log(error);
      res.json({
        message: "error occured",
      });
    });
};

const getSingleContacts = (req, res) => {
  let { id } = req.params;
  Contact.findById(id)
    .then((contact) => {
      res.json(contact);
    })
    .catch((error) => {
      console.log(error);
      res.json({
        message: "error occured",
      });
    });
};

const createContacts = async (req, res) => {
  try {
    let contacts = await Contact.find({ name: req.body.name });

    //form validation
    let error = {};
    let { name, phone, email, id } = req.body;

    if (!name) {
      error.name = "Provide a name";
    }
    if (!phone) {
      error.phone = "Provide a phone number";
    }
    if (!email) {
      error.email = "Provide an Email";
    }

    let isError = Object.keys(error).length > 0;
    //console.log(isError);
    if (isError) {
      return res.render("./index.ejs", { contacts, error });
    }
    if (id) {
      Contact.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name,
            phone,
            email,
          },
        }
      ).then(() => {
        Contact.find().then((contacts) => {
          res.render("./index.ejs", { contacts, error: {} });
        });
      });
    } else {
      console.log("hi");
      const newContact = Contact({
        name: name,
        phone: phone,
        email: email,
      });
      await newContact.save();

      Contact.find().then((contacts) => {
        return res.render("./index.ejs", { contacts, error: {} });
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const updateContacts = (req, res) => {
  let { name, email, phone } = req.body;
  let { id } = req.params;
  Contact.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name,
        email,
        phone,
      },
    },
    { new: true }
  )
    .then((contacts) => {
      res.render("./index.ejs", { contacts, error: {} });
    })
    .catch((e) => {
      res.json({
        message: "error occured",
      });
    });
};

const deleteContacts = (req, res) => {
  let { id } = req.params; //mongodb id

  Contact.findOneAndDelete({ _id: id })
    .then(() => {
      Contact.find().then((contacts) => {
        return res.render("./index.ejs", { contacts, error: {} });
      });
    })

    .catch((e) => {
      return res.status(500).json({ message: e.message });
    });
};

module.exports = {
  getAllContacts,
  getSingleContacts,
  createContacts,
  updateContacts,
  deleteContacts,
};
