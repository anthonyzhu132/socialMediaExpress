const mongoose = require('mongoose');

const postSchema = new mongoose.Scheme({
  title: {
    type: String,
    required: "Title is required to submit",
    minlength: 4,
    maxlength: 150,
  },
  body: {
    type: String,
    required: "Body is required to submit",
    minlength: 4,
    maxlength: 150,
  }
})