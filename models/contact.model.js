const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minlength: 9,
    maxlength: 15,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
