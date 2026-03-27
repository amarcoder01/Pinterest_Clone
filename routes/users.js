const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");
require('dotenv').config();

try {
  mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
} catch (e) {
  console.error('Synchronous error during mongoose.connect:', e);
}

const userSchema = new mongoose.Schema({
  username: String,
  fullname: String,  
  email: String,
  password: String,
  profileImage : String,
  contact: Number,
  boards: {
    type: Array,
    default: []
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);